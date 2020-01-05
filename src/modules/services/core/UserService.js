const ConfigsDAO = require("../../dao/ConfigsDAO");
const Bcrypt = require("bcrypt");

const UserFieldNames = require("../../dao/proxies/user/user-field-names");

const systemFields = [
    UserFieldNames.DEFAULT_CREDENTIALS_FOLDER,
    UserFieldNames.FILEPATH_FOR_IMPORT,
    UserFieldNames.FOLDER_FOR_EXPORT,
    UserFieldNames.NEW_ENCRYPTION_KEY
];

const excludeSystemFields = userRecord => {
    systemFields.forEach(propName => {
        delete userRecord[propName];
    });
    return userRecord;
};

class UserService {
    constructor() {
        this.configDAO = ConfigsDAO.getInstance();
    }

    getUserById(id) {
        let foundUser = this.configDAO.selectAccountById(id);
        if (foundUser) {
            foundUser = excludeSystemFields(foundUser);
        }
        return foundUser;
    }

    getAllUsers() {
        return this.configDAO.selectAllAccounts()
            .map(_ => excludeSystemFields(_));
    }

    getFileData(userInfo) {
        // The returning object structure is vital for DAO services!
        return {
            sourceFilePath: userInfo[UserFieldNames.FILEPATH],
            encryptionKey: userInfo[UserFieldNames.ENCRYPTION_KEY]
        }
    }

    createUser(userInfo) {
        userInfo[UserFieldNames.ID] = null;
        userInfo = this.hashEncryptionKey(userInfo);
        return this.saveUser(userInfo);
    }

    saveUser(userInfo) {
        if (!userInfo[UserFieldNames.SAVE_KEY]) {
            userInfo[UserFieldNames.ENCRYPTION_KEY] = "";
        }
        userInfo[UserFieldNames.NEW_ENCRYPTION_KEY] = undefined;
        userInfo[UserFieldNames.FOLDER_FOR_EXPORT] = undefined;
        userInfo[UserFieldNames.FILEPATH_FOR_IMPORT] = undefined;
        userInfo[UserFieldNames.LAST_MODIFIED_DATE] = new Date().getTime();
        return this.configDAO.saveAccount(userInfo);
    }

    hashEncryptionKey(userInfo) {
        const encKey = userInfo[UserFieldNames.ENCRYPTION_KEY];
        if (!encKey) {
            throw new Error("Cannot hash encryption key.");
        }
        const salt = Bcrypt.genSaltSync(5);
        userInfo[UserFieldNames.HASHED_ENCRYPTION_KEY] = Bcrypt.hashSync(encKey, salt);
        return userInfo;
    }

    checkEncryptionKey(userInfo) {
        const persistedUserInfo = this.getUserById(userInfo[UserFieldNames.ID]);
        if (!persistedUserInfo) {
            throw new Error(`Couldn't find account with ID=${userInfo[UserFieldNames.ID]}.`);
        }
        return Bcrypt.compareSync(
            userInfo[UserFieldNames.ENCRYPTION_KEY], // raw string
            persistedUserInfo[UserFieldNames.HASHED_ENCRYPTION_KEY] // hashed string
        );
    }

    deleteUser(userInfo) {
        return this.configDAO.deleteAccount(userInfo);
    }
}

module.exports = new UserService();