const Base64 = require("js-base64").Base64;
const Cryptr = require("cryptr");
const InputValidator = require("../util/InputValidator");

const _validate = (str, key) => {
    if (!str || typeof str !== "string"
        || !key || typeof key !== "string"
        || !InputValidator.isValidEncryptionKey(key)) {
        throw new Error("Unable to encrypt/decrypt data!")
    }
};

const encrypt = (str, key) => {
    _validate(str, key);
    const encodedStr = Base64.encode(str), cryptr = new Cryptr(key);
    return cryptr.encrypt(encodedStr);
};

const decrypt = (str, key) => {
    _validate(str, key);
    const cryptr = new Cryptr(key), decryptedStr = cryptr.decrypt(str);
    return Base64.decode(decryptedStr);
};

const Cipher = {
    encrypt,
    decrypt
};

module.exports = Cipher;