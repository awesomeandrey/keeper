const Cipher = require("./Сipher");

const VALID_ENC_KEY = "TotallySecretKey1", INVALID_ENC_KEY = "invalid key because of space";

const TEST_STR = "This string should be encrypted / Тестова стрічка, що для шифрування!";

describe("Data encryption/decryption", () => {
    test("Encrypt string", () => {
        const result = Cipher.encrypt(TEST_STR, VALID_ENC_KEY);
        expect(TEST_STR).toEqual(expect.not.stringContaining(result));
    });
    test("Encrypt string (failure)", () => {
        expect(() => Cipher.encrypt(TEST_STR, INVALID_ENC_KEY)).toThrow();
    });
    test("Decrypt string", () => {
        const encryptedStr = Cipher.encrypt(TEST_STR, VALID_ENC_KEY);
        const decryptedStr = Cipher.decrypt(encryptedStr, VALID_ENC_KEY);
        expect(decryptedStr).toBe(TEST_STR);
    });
    test("Decrypt string (failure)", () => {
        const encryptedStr = Cipher.encrypt(TEST_STR, VALID_ENC_KEY);
        expect(() => Cipher.decrypt(encryptedStr, INVALID_ENC_KEY)).toThrow();
    });
});