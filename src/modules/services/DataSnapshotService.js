const FileService = require("../io/FileService");
const CredentialsDAO = require("../dao/CredentialsDAO");

class DataSnapshotService {
    static buildSnapshot({fileData}) {
        const dao = CredentialsDAO.getInstance(fileData);
        return Object.assign({}, dao.state);
    }

    static applySnapshot({fileData, snapshot}) {
        FileService.eraseFile(fileData.sourceFilePath);
        const dao = CredentialsDAO.getInstance(fileData);
        dao.state = snapshot;
        return DataSnapshotService.buildSnapshot({fileData});
    }

    static importSnapshot({fileData, snapshot}) {
        const dao = CredentialsDAO.getInstance(fileData);
        dao.importFolders(snapshot[dao.tables.FOLDERS]);
        dao.importCredentials(snapshot[dao.tables.CREDENTIALS]);
        return dao.state;
    }

    static exportSnapshot({fileData, targetFilePath}) {
        if (!FileService.fileExists(targetFilePath)) {
            throw new Error("Export file was not found!");
        }
        const snapshot = this.buildSnapshot({fileData});
        FileService.writeToFile(targetFilePath, JSON.stringify(snapshot));
    }
}

module.exports = DataSnapshotService;