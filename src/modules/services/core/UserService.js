const ConfigsDAO = require("../../dao/ConfigsDAO");
const Bcrypt = require("bcrypt");

const UserFieldNames = require("../../dao/proxies/user/user-field-names");

const tempFields = [
    UserFieldNames.DEFAULT_CREDENTIALS_FOLDER,
    UserFieldNames.FILEPATH_FOR_IMPORT,
    UserFieldNames.FOLDER_FOR_EXPORT,
    UserFieldNames.NEW_ENCRYPTION_KEY
];

const systemFields = [
    UserFieldNames.HASHED_ENCRYPTION_KEY,
    ...tempFields
];

const excludeFields = (record, fields) => {
    const result = Object.assign({}, record);
    fields.forEach(propName => {
        delete result[propName];
    });
    return result;
};

const excludeSystemFields = userRecord => {
    return excludeFields(userRecord, systemFields);
};

const excludeTempFields = userRecord => {
    return excludeFields(userRecord, tempFields);
};

class UserService {
    constructor() {
        this.configDAO = ConfigsDAO.getInstance();
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
        // Copy all user info to local variable;
        let tempUserInfo = Object.assign({}, userInfo);
        // Delete 'ENCRYPTION_KEY' if respective setting is not populated OR equal to `false`;
        if (!tempUserInfo[UserFieldNames.SAVE_KEY]) {
            // Re-write prop because it can be changed;
            tempUserInfo[UserFieldNames.ENCRYPTION_KEY] = undefined;
        }
        // Update last modified date;
        tempUserInfo[UserFieldNames.LAST_MODIFIED_DATE] = new Date().getTime();
        // Exclude temporary fields;
        tempUserInfo = excludeTempFields(tempUserInfo);
        // Persist changes in DB source;
        const savedUser = this.configDAO.saveAccount(tempUserInfo);
        // Merge persisted changes into original object;
        const resultObj = Object.assign(userInfo, savedUser);
        return excludeSystemFields(resultObj);
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
        const userId = userInfo[UserFieldNames.ID], persistedUserInfo = this.configDAO.selectAccountById(userId);
        if (!persistedUserInfo) {
            throw new Error(`Couldn't find account with ID=${userId}.`);
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