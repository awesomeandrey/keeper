const IpcMain = require("../modules/ipc/IpcMain");
const FileService = require("../modules/io/FileService");
const UserService = require("../modules/services/core/UserService");
const FolderService = require("../modules/services/core/FolderService");
const CredentialService = require("../modules/services/core/CredentialService");
const DataSnapshotService = require("../modules/services/DataSnapshotService");
const RootFolderBuilder = require("../modules/services/root-folder-builder/RootFolderBuilder");
const UserFields = require("../modules/dao/proxies/user/user-field-names");
const {Channels} = require("../constants");

/**
 * Internal variable holding all label translations.
 * Initialized during app launch.
 */
let Label = {};

const subscribeToChannels = ({app, shell, dialog, mainWindow}) => {
    IpcMain.subscribe({
        channelName: Channels.LOAD_APP, callback: data => {
            // Pass all labels to backend in order to keep all messages translated;
            let {Label: labelsObj} = data;
            Label = labelsObj;
            // Return global application info;
            return {
                appVersion: app.getVersion()
            };
        }
    });
    IpcMain.subscribe({channelName: Channels.QUIT_APP, callback: () => app.quit()});
    IpcMain.subscribe({channelName: Channels.OPEN_LINK, callback: link => shell.openExternal(link)});

    IpcMain.subscribe({channelName: Channels.LOAD_ACCOUNTS, callback: () => UserService.getAllUsers()});
    IpcMain.subscribe({
        channelName: Channels.CREATE_ACCOUNT, callback: userInfo => {
            userInfo[UserFields.FILEPATH] = FileService.createDataFile(
                userInfo[UserFields.NAME], userInfo[UserFields.DEFAULT_CREDENTIALS_FOLDER]
            );
            return UserService.createUser(userInfo);
        }
    });
    IpcMain.subscribe({
        channelName: Channels.VALIDATE_ACCOUNT, callback: userInfo => {
            Commons.validateFileDataPresence(userInfo);
            Commons.validateEncryptionKey(userInfo);
            return true;
        }
    });
    IpcMain.subscribe({channelName: Channels.SAVE_ACCOUNT, callback: userInfo => UserService.saveUser(userInfo)});
    IpcMain.subscribe({channelName: Channels.DELETE_ACCOUNT, callback: userInfo => UserService.deleteUser(userInfo)});
    IpcMain.subscribe({
        channelName: Channels.CHANGE_ENC_KEY, callback: userInfo => {
            Commons.validateFileDataPresence(userInfo);
            Commons.validateEncryptionKey(userInfo);
            Commons.validateNewEncryptionKey(userInfo);
            const fileData = Commons.getFileData(userInfo);
            const snapshot = DataSnapshotService.buildSnapshot({fileData}); // stored in runtime;
            const newEncKey = userInfo[UserFields.NEW_ENCRYPTION_KEY];
            const newFileData = {...fileData, encryptionKey: newEncKey};
            try {
                // Import DB snapshot with new encryption key;
                DataSnapshotService.applySnapshot({fileData: newFileData, snapshot});
                // Update user info respectively;
                let updatedUserInfo = {...userInfo};
                updatedUserInfo[UserFields.ENCRYPTION_KEY] = newEncKey;
                updatedUserInfo = UserService.hashEncryptionKey(updatedUserInfo);
                return UserService.saveUser(updatedUserInfo);
            } catch (e) {
                // Rollback policy;
                DataSnapshotService.applySnapshot({fileData, snapshot});
                throw new Error(e);
            }
        }
    });
    IpcMain.subscribe({
        channelName: Channels.IMPORT_DB_SNAPSHOT, callback: ({userInfo, snapshotFilePath}) => {
            Commons.validateEncryptionKey(userInfo);
            Commons.validateFilePresence(snapshotFilePath);
            const fileData = Commons.getFileData(userInfo);
            const snapshot = JSON.parse(
                FileService.readFromFile(snapshotFilePath)
            );
            DataSnapshotService.importSnapshot({fileData, snapshot});
        }
    });
    IpcMain.subscribe({
        channelName: Channels.EXPORT_DB_SNAPSHOT, callback: ({userInfo, targetFolderPath}) => {
            Commons.validateEncryptionKey(userInfo);
            const targetFilePath = FileService.createExportDataFile(targetFolderPath);
            const fileData = Commons.getFileData(userInfo);
            DataSnapshotService.exportSnapshot({fileData, targetFilePath});
        }
    });

    IpcMain.subscribe({
        channelName: Channels.BUILD_ROOT_FOLDER_DEF, callback: userInfo => {
            Commons.validateFileDataPresence(userInfo);
            Commons.validateEncryptionKey(userInfo);
            const fileData = Commons.getFileData(userInfo);
            const folderService = new FolderService(fileData), credentialService = new CredentialService(fileData);
            return RootFolderBuilder.build({
                folders: folderService.getAllFolders(),
                credentials: credentialService.getAllCredentials()
            });
        }
    });
    IpcMain.subscribe({
        channelName: Channels.SAVE_CREDENTIAL, callback: ({userInfo, credential}) => {
            Commons.validateFileDataPresence(userInfo);
            Commons.validateEncryptionKey(userInfo);
            const fileData = Commons.getFileData(userInfo);
            const credentialService = new CredentialService(fileData);
            return credentialService.saveCredential(credential);
        }
    });
    IpcMain.subscribe({
        channelName: Channels.DELETE_CREDENTIAL, callback: ({userInfo, credential}) => {
            Commons.validateFileDataPresence(userInfo);
            Commons.validateEncryptionKey(userInfo);
            const fileData = Commons.getFileData(userInfo);
            const credentialService = new CredentialService(fileData);
            return credentialService.deleteCredential(credential);
        }
    });
    IpcMain.subscribe({
        channelName: Channels.SAVE_FOLDER, callback: ({userInfo, folder}) => {
            Commons.validateFileDataPresence(userInfo);
            Commons.validateEncryptionKey(userInfo);
            const fileData = Commons.getFileData(userInfo);
            const folderService = new FolderService(fileData);
            return folderService.saveFolder(folder);
        }
    });
    IpcMain.subscribe({
        channelName: Channels.SELECT_ALL_FOLDERS, callback: userInfo => {
            Commons.validateFileDataPresence(userInfo);
            Commons.validateEncryptionKey(userInfo);
            const fileData = Commons.getFileData(userInfo);
            const folderService = new FolderService(fileData);
            return folderService.selectAll();
        }
    });
    IpcMain.subscribe({
        channelName: Channels.DELETE_FOLDER, callback: ({userInfo, folder}) => {
            Commons.validateFileDataPresence(userInfo);
            Commons.validateEncryptionKey(userInfo);
            const fileData = Commons.getFileData(userInfo);
            const folderService = new FolderService(fileData);
            return folderService.deleteFolder(folder);
        }
    });
    IpcMain.subscribe({
        channelName: Channels.CHOOSE_FOLDER, callback: () => {
            const selectedFolders = dialog.showOpenDialogSync(mainWindow, {
                properties: ["openDirectory"]
            });
            return selectedFolders[0];
        }
    });
};

const Commons = {
    getFileData(userInfo) {
        this.validateEncryptionKey(userInfo);
        this.validateFileDataPresence(userInfo);
        return UserService.getFileData(userInfo);
    },
    validateFilePresence(filePath) {
        const fileExists = FileService.fileExists(filePath);
        if (!fileExists) {
            throw new Error(Label.Grl_FileNotFound);
        }
    },
    validateEncryptionKey(userInfo) {
        const isKeyConfirmed = UserService.checkEncryptionKey(userInfo);
        if (!isKeyConfirmed) {
            throw new Error(Label.EncryptionKey_NotConfirmed);
        }
    },
    validateFileDataPresence(userInfo) {
        const fileData = UserService.getFileData(userInfo);
        this.validateFilePresence(fileData.sourceFilePath);
    },
    validateNewEncryptionKey(userInfo) {
        const newEncKey = userInfo[UserFields.NEW_ENCRYPTION_KEY];
        if (!newEncKey) {
            throw new Error(Label.EncryptionKey_NotProvided);
        } else if (newEncKey === userInfo[UserFields.ENCRYPTION_KEY]) {
            throw new Error(Label.EncryptionKey_CannotBeSame);
        }
    }
};

const IpcMainController = {
    subscribeToChannels
};

module.exports = IpcMainController;