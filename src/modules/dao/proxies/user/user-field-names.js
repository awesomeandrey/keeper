const CommonFields = require("../common/common-fields");

const UserFieldNames = Object.assign(CommonFields, {
    FILEPATH: "filePath",
    LANGUAGE: "lang",
    SAVE_KEY: "saveEncryptionKey",
    ENCRYPTION_KEY: "encryptionKey",
    LAST_MODIFIED_DATE: "lastModifiedDate",
    ENABLE_TELEGRAM_2FA: "enableTelegramNotifications",
    TELEGRAM_BOT_API_TOKEN: "telegramBotApiToken",
    TELEGRAM_BOT_CHAT_ID: "telegramBotChatId",
    // System fields;
    HASHED_ENCRYPTION_KEY: "hashedEncryptionKey",
    DEFAULT_CREDENTIALS_FOLDER: "defaultCredentialsFolder",
    FILEPATH_FOR_IMPORT: "filePathForImport",
    FOLDER_FOR_EXPORT: "folderForExport",
    NEW_ENCRYPTION_KEY: "newEncryptionKey"
});

module.exports = UserFieldNames;