## Keeper

<img src="public/logo.png" alt="Keeper logo" width="50" height="50"/>

Desktop application supporting encryption for user-defined credentials 🔐

[![Build App Executable 🔫](https://github.com/awesomeandrey/keeper/actions/workflows/build_app_executable.yml/badge.svg?branch=master)](https://github.com/awesomeandrey/keeper/actions/workflows/build_app_executable.yml)

| Welcome Window                                | Credential Form                                |
|-----------------------------------------------|------------------------------------------------|
| ![Welcome Window](public/images/keeper_1.png) | ![Credential Form](public/images/keeper_2.png) |

### Build executable manually

Install `node` version specified in `package.json` file. It's recommended to
use [NVM](https://tecadmin.net/install-nvm-macos-with-homebrew/) in order to manage NODE versions on local machine:

```
export NV=v14 && nvm install "$NV" && nvm use "$NV"
```

Invoke the script below in order to generate executable:

```
npm install && npm run electron-pack
```

Note that the executable generation might take 5-10 minutes to complete!

### Build Executable Automatically

Invoke [Build App Executable](https://github.com/awesomeandrey/keeper/actions/workflows/build_app_executable.yml) GitHub
Action Workflow and download artifact with executable file for your OS:

| OS      | Executable File Extension |
|---------|---------------------------|
| MacOS   | `*.dmg`                   |
| Ubuntu  | `*.deb`                   |
| Windows | `*.exe `                  |

To install `.deb` file run this command: `sudo dpkg -i <PATH>/keeper*.deb`

#### Technical stack

`electron` `nodejs` `react` `js` `slds` `jest` `yarn` `npm` `bcrypt` `crypt` `react-dnd` `github-actions`

#### Resources used

- [Salesforce Lightning Design System](https://www.lightningdesignsystem.com)
- [Lightning Design System for React](https://react.lightningdesignsystem.com)
- [Building a production electron application](https://medium.com/@johndyer24/building-a-production-electron-create-react-app-application-with-shared-code-using-electron-builder-c1f70f0e2649)
- [State management with React Hooks](https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8)
- [LowDB - small JSON database for Electron](https://www.npmjs.com/package/lowdb)
- [Windows Bash - Add 'Rsync'](https://blog.tiger-workshop.com/add-rsync-to-git-bash-for-windows)
- [React DnD](https://react-dnd.github.io/react-dnd/about)
