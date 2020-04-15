const InputValidator = require("./InputValidator");

describe("InputValidator", () => {
    test("isValidUrl", () => {
        [
            {url: "https://jestjs.io", valid: true},
            {url: "https://jestjs.io/docs/en/expect#tobe", valid: true},
            {url: "ftp://192.168.0.1", valid: true},
            {url: "://test.test", valid: false},
            {url: "google.com", valid: false},
            {url: "google", valid: false}
        ].forEach(caseDef => {
            const isValidUrl = InputValidator.isValidUrl(caseDef.url);
            expect(isValidUrl).toBe(caseDef.valid);
        });
    });
    test("isValidEncryptionKey", () => {
        [
            {url: "thiskeyist0000000000long", valid: false},
            {url: "thiskeyisshort", valid: false},
            {url: "space not allowed", valid: false},
            {url: "ThisIsVal1dKEY_77", valid: true}
        ].forEach(caseDef => {
            const isValidEncKey = InputValidator.isValidEncryptionKey(caseDef.url);
            expect(isValidEncKey).toBe(caseDef.valid);
        });
    });
});