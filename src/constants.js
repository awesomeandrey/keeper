module.exports = {
    Channels: {
        /**
         * User account actions;
         */
        LOAD_ACCOUNTS: "loadAccounts",
        VALIDATE_ACCOUNT: "validateAccount",
        CREATE_ACCOUNT: "createAccount",
        SAVE_ACCOUNT: "saveAccount",
        DELETE_ACCOUNT: "deleteAccount",
        CHANGE_ENC_KEY: "changeEncryptionKey",
        IMPORT_DB_SNAPSHOT: "importDatabaseSnapshot",
        EXPORT_DB_SNAPSHOT: "exportDatabaseSnapshot",
        /**
         * Compose "rootFolder";
         */
        BUILD_ROOT_FOLDER_DEF: "buildRootFolderDefinition",
        /**
         * Credential actions;
         */
        SAVE_CREDENTIAL: "saveCredential",
        DELETE_CREDENTIAL: "deleteCredential",
        /**
         * Folder actions;
         */
        SAVE_FOLDER: "saveFolder",
        SELECT_ALL_FOLDERS: "selectAllFolders",
        DELETE_FOLDER: "deleteFolder",
        CHOOSE_FOLDER: "selectFolder",
        /**
         * Generic actions;
         */
        OPEN_LINK: "openLink",
        LOAD_APP: "loadApp",
        QUIT_APP: "quit"
    },
    ApplicationEvents: {
        SELECT_NAV_ITEM: "selectNavigationItem",
        REFRESH_DATA: "refreshData",
        /**
         * Folder events;
         */
        SELECT_FOLDER: "selectFolder",
        EDIT_FOLDER: "editFolder",
        DELETE_FOLDER: "deleteFolder",
        /**
         * Credential items events;
         */
        SELECT_CRED_ITEM: "selectCredItem",
        CREATE_CRED_ITEM: "createCredItem",
        /**
         * Custom modal container events;
         */
        OPEN_MODAL: "openModalWindow",
        CLOSE_MODAL: "closeModalWindow",
        /**
         * Toasts;
         */
        SHOW_TOAST: "showToast"
    },
    Links: {
        DEFAULT: "/",
        SETUP: "/setup",
        VAULT: "/vault"
    },
    FormMode: {
        CREATE_MODE: "create",
        VIEW_MODE: "view",
        EDIT_MODE: "edit"
    },
    FileNames: {
        CONFIG_FOLDER: ".keeper-v3",
        CONFIG_FILE: "keeper-v3-config.json",
        DATA_FILE: "keeper-v3-data.json",
        DATA_EXPORT_FILE: "keeper-v3-data-export.json",
    },
    FieldTypes: {
        TEXT: "text",
        LINK: "link",
        PASSWORD: "password",
        CHECKBOX: "checkbox",
        PICKLIST: "picklist",
        DATETIME: "datetime",
        FILE: "file",
        FOLDER: "folder",
        CUSTOM: "custom"
    },
    Patterns: {
        Url: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
        EncryptionKey: "^[a-zA-Z0-9_-]{17}$"
    }
};