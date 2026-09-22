# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Keeper is an Electron + React desktop app for storing user credentials with client-side encryption. There is no server/backend — each user account's data lives in its own encrypted file on disk.

## Commands

Requires Node >= 20.

```
npm install                # install deps
npm run electron-dev       # dev mode: React dev server + Electron, hot reload
npm start                  # React dev server only, no Electron shell
npm test                   # Jest tests (watch mode locally; CI=true npm test for one non-interactive run)
npm run build              # production React build into build/
npm run electron-pack      # full executable build (electron-builder) — 5-10 min
```

Run a single test file: `npx react-scripts test <path-to-test-file>`.

Dev/build scripts depend on `rsync` being installed (not preinstalled on Windows).

## Architecture

**Process split.** All privileged work — filesystem access, encryption, password hashing, native dialogs — happens in the Electron main process. The React renderer never touches disk directly; it always goes through a fixed set of named IPC channels, request/response style, normalized to a `{success, data}` / `{success, error}` shape.

**Auth & encryption.** Each user account has an encryption key, verified against a stored hash before any of that user's data can be accessed. The actual credential/folder data is symmetrically encrypted at rest, per account, and only ever decrypted in memory in the main process once the key is confirmed — the renderer never sees the raw key or the ciphertext. Rotating a user's encryption key snapshots their data, re-encrypts it under the new key, and rolls back on failure.

**Data layer.** A small generic CRUD layer underlies per-entity domain services (users, folders, credentials); these services are stateless per call, since a single request could be operating on a different user's file than the last. Proxy objects translate between raw stored records and the field-definition arrays consumed by generic create/edit/view form components, including support for arbitrary user-defined custom fields on credentials.
