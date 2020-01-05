const CredentialsDAO = require("../../dao/CredentialsDAO");
const FolderFieldNames = require("../../dao/proxies/folder/folder-field-names");

class FolderService {
    constructor(fileData) {
        this.credentialsDAO = CredentialsDAO.getInstance(fileData);
    }

    getAllFolders() {
        return this.credentialsDAO.selectFoldersAll();
    }

    saveFolder(folder) {
        if (folder[FolderFieldNames.PARENT_ID] === folder[FolderFieldNames.ID]) {
            folder[FolderFieldNames.PARENT_ID] = "";
        }
        return this.credentialsDAO.saveFolder(folder);
    }

    deleteFolder(folder) {
        // Delete inner credential record(s);
        const credentials = this.credentialsDAO.selectCredentialsByFolderId(folder[FolderFieldNames.ID]);
        credentials.forEach(_ => {
            this.credentialsDAO.deleteCredential(_);
        });
        // Delete inner folder(s);
        const innerFolders = this.credentialsDAO.selectFoldersByParentFolderId(folder[FolderFieldNames.ID]);
        innerFolders.forEach(_ => {
            this.deleteFolder(_);
        });
        return this.credentialsDAO.deleteFolder(folder);
    }

    selectAll() {
        return this.credentialsDAO.selectFoldersAll();
    }
}

module.exports = FolderService;