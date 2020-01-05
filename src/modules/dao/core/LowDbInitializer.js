const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const Cipher = require("../../security/Сipher");
const FileService = require("../../io/FileService");
const InputValidator = require("../../util/InputValidator");

const serialize = obj => JSON.stringify(obj || {});

const deserialize = str => JSON.parse(str || {});

const initLowDbConnection = ({sourceFilePath}) => {
    if (!FileService.fileExists(sourceFilePath)) {
        throw new Error("Could not initialize LowDB connection: source file was not found!")
    }
    const adapter = new FileSync(sourceFilePath, {
        serialize, deserialize
    });
    return low(adapter);
};

const initSecureLowDbConnection = ({sourceFilePath, encryptionKey}) => {
    if (!FileService.fileExists(sourceFilePath)) {
        throw new Error("Could not initialize secure LowDB connection: source file was not found!")
    } else if (!InputValidator.isValidEncryptionKey(encryptionKey)) {
        throw new Error("Could not initialize secure LowDB connection: invalid encryption key!")
    }
    const adapter = new FileSync(sourceFilePath, {
        serialize: data => {
            const rawStr = serialize(data);
            return Cipher.encrypt(rawStr, encryptionKey);
        },
        deserialize: rawStr => {
            const decryptedStr = Cipher.decrypt(rawStr, encryptionKey);
            return deserialize(decryptedStr);
        }
    });
    return low(adapter);
};

module.exports = {
    initLowDbConnection,
    initSecureLowDbConnection
};