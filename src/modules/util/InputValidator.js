const {Patterns} = require("../../constants");

const test = (s, p) => {
    if (typeof s !== "string" || typeof p !== "string") {
        return true;
    }
    const pattern = new RegExp(p);
    return pattern.test(s);
};

const isValidUrl = str => {
    return test(str, Patterns.Url);
};

const isValidEncryptionKey = str => {
    return test(str, Patterns.EncryptionKey);
};

module.exports = {
    test,
    isValidUrl,
    isValidEncryptionKey
};