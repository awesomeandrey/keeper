import UserFieldNames from "./user-field-names";

import {FieldTypes, Patterns} from "../../../../constants";
import {Label} from "../../../translation/LabelService";
import {LANG_OPTIONS} from "../../../translation/language-codes";

export default () => ({
    [UserFieldNames.NAME]: {
        label: Label.Field_User_Name,
        name: UserFieldNames.NAME,
        type: FieldTypes.TEXT,
        required: true
    },
    [UserFieldNames.FILEPATH]: {
        label: Label.Field_User_DataFilePath,
        name: UserFieldNames.FILEPATH,
        type: FieldTypes.FILE,
        required: true
    },
    [UserFieldNames.LANGUAGE]: {
        label: Label.Field_User_Language,
        name: UserFieldNames.LANGUAGE,
        type: FieldTypes.PICKLIST,
        required: true,
        options: LANG_OPTIONS
    },
    [UserFieldNames.SAVE_KEY]: {
        label: Label.Field_User_SaveKey,
        name: UserFieldNames.SAVE_KEY,
        type: FieldTypes.CHECKBOX,
        value: false
    },
    [UserFieldNames.ENCRYPTION_KEY]: {
        label: Label.Field_User_EncryptionKey,
        name: UserFieldNames.ENCRYPTION_KEY,
        type: FieldTypes.PASSWORD,
        required: true,
        pattern: Patterns.EncryptionKey,
        helpText: Label.Field_User_EncryptionKey_HelpText
    },
    [UserFieldNames.ENABLE_TELEGRAM_2FA]: {
        label: Label.Field_User_EnableTelegram2FA,
        name: UserFieldNames.ENABLE_TELEGRAM_2FA,
        type: FieldTypes.CHECKBOX,
        value: false
    },
    [UserFieldNames.TELEGRAM_BOT_API_TOKEN]: {
        label: Label.Field_User_TelegramBotToken,
        name: UserFieldNames.TELEGRAM_BOT_API_TOKEN,
        type: FieldTypes.TEXT,
        helpText: Label.Form_User_TelegramBot_SetupGuide
    },
    [UserFieldNames.TELEGRAM_BOT_CHAT_ID]: {
        label: Label.Field_User_TelegramBotChatId,
        name: UserFieldNames.TELEGRAM_BOT_CHAT_ID,
        type: FieldTypes.TEXT,
        value: "0000",
        readonly: true
    },
    [UserFieldNames.LAST_MODIFIED_DATE]: {
        label: Label.Grl_Field_LastModifiedDate,
        name: UserFieldNames.LAST_MODIFIED_DATE,
        type: FieldTypes.DATETIME,
        readonly: true
    },
    // System field definitions;
    [UserFieldNames.DEFAULT_CREDENTIALS_FOLDER]: {
        label: Label.Field_User_DefaultCredentialsFolder,
        name: UserFieldNames.DEFAULT_CREDENTIALS_FOLDER,
        type: FieldTypes.FOLDER,
        required: true
    },
    [UserFieldNames.FILEPATH_FOR_IMPORT]: {
        label: Label.Field_User_FilePathForImport,
        name: UserFieldNames.FILEPATH_FOR_IMPORT,
        type: FieldTypes.FILE,
        required: true
    },
    [UserFieldNames.FOLDER_FOR_EXPORT]: {
        label: Label.Field_User_FolderForExport,
        name: UserFieldNames.FOLDER_FOR_EXPORT,
        type: FieldTypes.FOLDER,
        required: true
    },
    [UserFieldNames.HASHED_ENCRYPTION_KEY]: {
        label: Label.Field_User_HashedEncryptionKey,
        name: UserFieldNames.HASHED_ENCRYPTION_KEY,
        type: FieldTypes.PASSWORD
    },
    [UserFieldNames.NEW_ENCRYPTION_KEY]: {
        label: Label.Field_User_NewEncryptionKey,
        name: UserFieldNames.NEW_ENCRYPTION_KEY,
        type: FieldTypes.PASSWORD,
        required: true,
        pattern: Patterns.EncryptionKey,
        helpText: Label.Field_User_NewEncryptionKey_HelpText
    }
});