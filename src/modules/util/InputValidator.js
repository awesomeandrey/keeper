const {Patterns} = require("../../constants");
const {isUrl} = require("is-valid-url");

const test = (s, p) => {
    if (typeof s !== "string" || typeof p !== "string") {
        return true;
    }
    const pattern = new RegExp(p);
    return pattern.test(s);
};

const isValidUrl = str => {
    return isUrl(str);
};

const isValidEncryptionKey = str => {
    return test(str, Patterns.EncryptionKey);
};

module.exports = {
    test,
    isValidUrl,
    isValidEncryptionKey
};