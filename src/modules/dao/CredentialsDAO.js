const GenericDAO = require("./core/GenericDAO");
const CommonFieldNames = require("./proxies/common/common-fields");
const CredentialFieldNames = require("./proxies/credential/credential-field-names");
const FolderFieldNames = require("./proxies/folder/folder-field-names");

const {initSecureLowDbConnection} = require("./core/LowDbInitializer");

const CREDENTIALS = "credentials", FOLDERS = "folders";

/**
 * Folder record structure;
 *
 * {
 *     id: "",
 *     parentId: "",
 *     folderName: "Education",
 *     folders: [],
 *     credentials: [],
 * }
 *
 * Credential record structure;
 *
 * {
 *     id: "",
 *     folderId: "",
 *     [standardFieldName]: [value],
 *     [customFieldName]: {
 *         label, value, type: CUSTOM
 *     },
 * }
 */

class CredentialsDAO extends GenericDAO {
    constructor(params) {
        super(params);
        this.lowDB.defaults({[FOLDERS]: [], [CREDENTIALS]: []}).write();
    }

    static getInstance(fileData) {
        const lowDb = initSecureLowDbConnection(fileData);
        return new this(lowDb);
    }

    get tables() {
        return {FOLDERS, CREDENTIALS};
    }

    get state() {
        return this.lowDB.getState();
    }

    set state(value) {
        Object.keys(this.tables).forEach(tableKey => {
            let tableName = this.tables[tableKey];
            if (!value.hasOwnProperty(tableName) || !Array.isArray(value[tableName])) {
                value[tableName] = [];
            }
        });
        this.lowDB.setState(value).write();
    }

    selectCredentialsAll() {
        return super.selectAll({tableName: CREDENTIALS});
    }

    selectFoldersAll() {
        return super.selectAll({tableName: FOLDERS});
    }

    selectCredentialById(id) {
        return super.selectById({tableName: CREDENTIALS, id});
    }

    selectCredentialsByFolderId(folderId) {
        return super.selectByField({tableName: CREDENTIALS, key: CredentialFieldNames.FOLDER_ID, value: folderId});
    }

    selectFolderById(id) {
        return super.selectById({tableName: FOLDERS, id});
    }

    selectFoldersByParentFolderId(folderId) {
        return super.selectByField({tableName: FOLDERS, key: FolderFieldNames.PARENT_ID, value: folderId});
    }

    saveCredential(credential) {
        const recordId = credential[CommonFieldNames.ID], foundCredential = this.selectCredentialById(recordId);
        if (foundCredential) {
            // Re-write completely (due to 'custom fields' feature);
            let isDeleted = this.deleteCredential(foundCredential);
            if (!isDeleted) {
                throw new Error("Internal error occurred.");
            }
            return super.persist({tableName: CREDENTIALS, record: credential})
        } else {
            return super.save({tableName: CREDENTIALS, record: credential});
        }
    }

    saveFolder(folder) {
        return super.save({tableName: FOLDERS, record: folder});
    }

    deleteCredential(credential) {
        return super.delete({tableName: CREDENTIALS, record: credential});
    }

    deleteFolder(folder) {
        return super.delete({tableName: FOLDERS, record: folder});
    }

    // Importing logic;

    importCredentials(credentials = []) {
        return credentials.map(_ => {
            let persistedCredential = this.selectCredentialById(_[CommonFieldNames.ID]);
            if (persistedCredential) {
                return this.saveCredential(_);
            } else {
                return super.persist({tableName: CREDENTIALS, record: _});
            }
        });
    }

    importFolders(folders = []) {
        return folders.map(_ => {
            let persistedFolder = this.selectFolderById(_[CommonFieldNames.ID]);
            if (persistedFolder) {
                return this.saveFolder(_);
            } else {
                return super.persist({tableName: FOLDERS, record: _});
            }
        });
    }

}

module.exports = CredentialsDAO;