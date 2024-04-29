import {LANG_CODES} from "./language-codes";

const {EN, UK} = LANG_CODES;

export default {
    // General;
    Grl_AppName: {[EN]: "Keeper", [UK]: "Keeper"},
    Grl_AppVersion: {[EN]: "App version", [UK]: "Версія додатку"},
    Grl_AppDescription: {
        [EN]: "Desktop app for storing credentials.",
        [UK]: "Десктопний додаток для зберігання секретних даних."
    },
    Grl_AboutApp: {
        [EN]: "Open sourced software.",
        [UK]: "Додаток із відкритим програмним кодом."
    },
    Grl_ManageAccounts: {[EN]: "Manage accounts", [UK]: "Видалити акаунт"},
    Grl_NoAccountsFound: {[EN]: "No local accounts found.", [UK]: "Жодного акаунту не знайдено."},
    Grl_FileNotFound: {[EN]: "File was not found.", [UK]: "Файл не знайдено."},
    Grl_Vault: {[EN]: "VAULT", [UK]: "СЕКРЕТНІ ДАНІ"},
    Grl_EmptyVault: {[EN]: "There are no items in your store.", [UK]: "Секретних даних не знайдено."},
    Grl_EmptySet: {[EN]: "Nothing was found.", [UK]: "Збігів не знайдено."},
    Grl_Credential: {[EN]: "Credential", [UK]: "Дані"},
    Grl_Folder: {[EN]: "Folder", [UK]: "Папку"},
    Grl_Form_CustomFieldName: {[EN]: "Custom Field Name", [UK]: "Назва Поля"},
    Grl_Form_CustomFieldValue: {[EN]: "Custom Field Value", [UK]: "Значення"},
    Grl_Form_AddField: {[EN]: "Add Field", [UK]: "Додати"},
    Grl_Form_DeleteField: {[EN]: "Delete", [UK]: "Видалити"},
    Grl_Field_LastModifiedDate: {[EN]: "Last Modified Date", [UK]: "Остання дата оновлення"},
    Grl_Field_LastLogin: {[EN]: "Last Login Date", [UK]: "Остання дата входу"},

    // App links;
    LinkQuit: {[EN]: "Quit", [UK]: "Вийти"},
    LinkSetup: {[EN]: "Setup", [UK]: "Налаштування"},
    LinkVault: {[EN]: "Vault", [UK]: "Секретні дані"},

    // Buttons;
    Btn_AddAccount: {[EN]: "Add Account", [UK]: "Додати Акаунт"},
    Btn_CreateNew: {[EN]: "Create New", [UK]: "Створити"},
    Btn_Save: {[EN]: "Save", [UK]: "Зберегти"},
    Btn_Confirm: {[EN]: "Confirm", [UK]: "Підтвердити"},
    Btn_Edit: {[EN]: "Edit", [UK]: "Редагувати"},
    Btn_Cancel: {[EN]: "Cancel", [UK]: "Відміна"},
    Btn_Delete: {[EN]: "Delete", [UK]: "Видалити"},
    Btn_Move: {[EN]: "Move", [UK]: "Перемістити"},
    Btn_Back: {[EN]: "Back", [UK]: "Назад"},
    Btn_DeleteAccount: {[EN]: "Delete Account", [UK]: "Видалити Акаунт"},
    Btn_ValidateKey: {[EN]: "Validate Key", [UK]: "Перевірити"},

    // Form general labels;
    Form_Grl_InputPlaceholder: {[EN]: "Type here...", [UK]: "Введіть значення тут..."},
    Form_Grl_WrongInput: {[EN]: "Wrong input!", [UK]: "Перевірте введені дані!"},
    Form_Grl_WrongValue: {[EN]: "Wrong value", [UK]: "Невірне значення"},
    Form_Grl_RequiredField: {[EN]: "This field is required", [UK]: "Це поле є обов'язковим"},
    Form_Grl_ConfirmationTitle: {[EN]: "Confirmation", [UK]: "Підтвердження дії"},
    Form_Grl_ConfirmationSubTitle: {
        [EN]: "Are you sure you want to continue with your action?",
        [UK]: "Ви впевнені, що хочете продовжити дію?"
    },
    Form_Grl_SelectFile: {[EN]: "Select File", [UK]: "Обрати файл"},
    Form_Grl_SelectFolder: {[EN]: "Select Folder", [UK]: "Обрати папку"},
    Form_Grl_VerifyInput: {[EN]: "Verify your input, please.", [UK]: "Будь-ласка, уважно перевіте введені дані."},
    Form_Grl_UnsupportedFileType: {[EN]: "Unsupported file type selected", [UK]: "Непідтримуваний тип файлу"},
    Form_Grl_SelectOption: {[EN]: "Select option", [UK]: "Вибрати"},
    Form_Grl_InvalidUrl: {[EN]: "URL is not valid", [UK]: "Посилання введено некоректно"},

    // Toast titles;
    ToastSuccessTitle: {[EN]: "Success!", [UK]: "Успішна операція!"},
    ToastSuccessSubTitle: {[EN]: "Operation was successful.", [UK]: "Операцію виконано успішно."},
    ToastWarningTitle: {[EN]: "Warning!", [UK]: "Попередження!"},
    ToastErrorTitle: {[EN]: "Error!", [UK]: "Помилка!"},

    // Dnd actions;
    DnD_MoveToRootFolder: {[EN]: "Move to ROOT folder", [UK]: "Перемістити до кореневої папки"},
    DnD_RecentCredentials: {[EN]: "Recent credentials", [UK]: "Нещодавно обрані дані"},

    // CRUD Account actions;
    Form_User_View: {[EN]: "Account Info", [UK]: "Інформація про акаунт"},
    Form_User_Create: {[EN]: "Create New Account", [UK]: "Створити Новий Акаунт"},
    Form_User_CreateError: {[EN]: "Couldn't create account.", [UK]: "Не можливо створити акаунт."},
    Form_User_Created: {[EN]: "New account has been created.", [UK]: "Новий акаунт створено."},
    Form_User_Edit: {[EN]: "Edit Account", [UK]: "Редагувати Акаунт"},
    Form_User_Edited: {[EN]: "Account was updated.", [UK]: "Дані акаунта оновлено."},
    Form_User_Deleted: {[EN]: "Account was deleted.", [UK]: "Акаунт видалено."},
    Form_User_DeleteError: {[EN]: "Couldn't delete account.", [UK]: "Неможливо видалити акаунт."},
    Form_User_ChangeEncryptionKey: {[EN]: "Change Encryption Key", [UK]: "Змінити Секретний Ключ"},
    Form_User_ChangeEncryptionKeyError: {
        [EN]: "Couldn't change Encryption Key.",
        [UK]: "Неможливо змінити Секретний Ключ."
    },
    Form_User_ExportData: {[EN]: "Export", [UK]: "Експортувати"},
    Form_User_ExportDataConfirmation: {
        [EN]: "Are you sure you want to export data?",
        [UK]: "Ви впевнені, що бажаєте експортувати дані?"
    },
    Form_User_ExportDataError: {[EN]: "Couldn't export data!", [UK]: "Неможливо експортувати дані!"},
    Form_User_ExportWarning: {
        [EN]: "You're going to export the credentials in decrypted format!",
        [UK]: "Ваші секретні дані буде експортовано у де-шифрованому вигляді!"
    },
    Form_User_ImportData: {[EN]: "Import", [UK]: "Імпортувати"},
    Form_User_ImportDataConfirmation: {
        [EN]: "Are you sure you want to import data?",
        [UK]: "Ви впевнені, що бажаєте імпортувати дані?"
    },
    Form_User_ImportDataError: {[EN]: "Couldn't import data!", [UK]: "Неможливо імпортувати дані!"},
    Form_User_ImportWarning: {
        [EN]: "Keep in mind that the data file should be decrypted in order to be imported correctly!",
        [UK]: "Майте на увазі, що імпортований файл повинен бути розшифрованим для успішного імпорту!"
    },

    // Setup tabs;
    Tab_Setup: {[EN]: "Setup Account", [UK]: "Налаштування акаунту"},
    Tab_EncryptionKey: {[EN]: "Encryption Key", [UK]: "Секретний Ключ"},
    Tab_ManageData: {[EN]: "Manage Data", [UK]: "Управління даними"},
    Tab_About: {[EN]: "About", [UK]: "Про додаток"},

    // User fields;
    Field_User_Name: {[EN]: "Name", [UK]: "Ім'я Користувача"},
    Field_User_DataFilePath: {[EN]: "Data File Path", [UK]: "Шлях до файлу даних"},
    Field_User_Language: {[EN]: "Language", [UK]: "Мова"},
    Field_User_SaveKey: {[EN]: "Save Encryption Key locally", [UK]: "Зберегти секретний ключ локально"},
    Field_User_EncryptionKey: {[EN]: "Encryption Key", [UK]: "Секретний Ключ"},
    Field_User_EncryptionKey_HelpText: {
        [EN]: "Key should be 17 symbols size. Only latin letters are allowed.",
        [UK]: "Секретний Ключ має складатися з букв англійського алфавіту. Довжина ключа має становити 17 символів."
    },
    Field_User_DefaultCredentialsFolder: {
        [EN]: "Select folder for credentials",
        [UK]: "Оберіть папку для зберігання даних"
    },
    Field_User_FilePathForImport: {
        [EN]: "Select file to import data from",
        [UK]: "Укажіть файл, звідки імпортувати дані"
    },
    Field_User_FolderForExport: {
        [EN]: "Select folder to export data to",
        [UK]: "Укажіть папку, куди експортувати дані"
    },
    Field_User_HashedEncryptionKey: {[EN]: "Hashed Encryption Key", [UK]: "Хешований Секретний Ключ"},
    Field_User_NewEncryptionKey: {[EN]: "New Encryption Key", [UK]: "Новий Секретний Ключ"},
    Field_User_NewEncryptionKey_HelpText: {
        [EN]: "New Encryption Key should match same pattern as previous one, but not to be identical.",
        [UK]: "Новий Секретний Ключ має відповідати тим же вимогам, що і попердній, але при цьому він має відрізнятися."
    },

    // Key confirmation panel;
    EncryptionKey_ToConfirm: {
        [EN]: "Please, confirm your encryption key!",
        [UK]: "Будь-ласка, підтвердіть секретний ключ!"
    },
    EncryptionKey_Confirmed: {[EN]: "Key was confirmed.", [UK]: "Секретний ключ підтверджено."},
    EncryptionKey_ToProvide: {[EN]: "Provide encryption key", [UK]: "Введіть секретний ключ"},
    EncryptionKey_NotConfirmed: {[EN]: "Encryption key was not confirmed!", [UK]: "Ключ не підтверджено!"},
    EncryptionKey_NotProvided: {[EN]: "New Encryption key was not provided!", [UK]: "Новий ключ не надано."},
    EncryptionKey_CannotBeSame: {
        [EN]: "New Encryption key cannot be the same!",
        [UK]: "Не можна повторно використати попередній ключ."
    },

    // Credential form;
    Form_Credential_Empty: {
        [EN]: "Please, select credential from the list.",
        [UK]: "Будь-ласка, оберіть дані для перегляду."
    },
    Form_Credential_Create: {[EN]: "Create New Credential", [UK]: "Створити Нові Дані"},
    Form_Credential_CreateError: {[EN]: "Couldn't create credential.", [UK]: "Не можливо створити дані."},
    Form_Credential_Edit: {[EN]: "Update Credential", [UK]: "Оновити дані"},
    Form_Credential_EditError: {[EN]: "Couldn't update credential.", [UK]: "Не можливо оновити дані."},
    Form_Credential_DeleteError: {[EN]: "Couldn't delete credential.", [UK]: "Не можливо видалити дані."},
    Form_Credential_DeleteConfirmation: {
        [EN]: "Do you want to delete credential?",
        [UK]: "Ви впевнені, що бажаєте видалити запис?"
    },
    Form_Credential_Msg_Deleted: {[EN]: "Credential was deleted.", [UK]: "Запис видалено."},
    Form_Credential_Move: {[EN]: "Move credential", [UK]: "Перемістити запис"},

    // Credential fields;
    Field_Credential_Title: {[EN]: "Title", [UK]: "Назва"},
    Field_Credential_FolderId: {[EN]: "Folder", [UK]: "Папка"},
    Field_Credential_UsernameOrLogin: {[EN]: "Username or Login", [UK]: "Логін"},
    Field_Credential_Password: {[EN]: "Password", [UK]: "Пароль"},
    Field_Credential_Link: {[EN]: "Website", [UK]: "Веб-сайт"},

    // Folder form;
    Form_Folder_Create: {[EN]: "Create Folder", [UK]: "Створити папку"},
    Form_Folder_CreateError: {[EN]: "Couldn't create folder.", [UK]: "Не можливо створити папку."},
    Form_Folder_Edit: {[EN]: "Edit Folder", [UK]: "Редагувати папку"},
    Form_Folder_EditError: {[EN]: "Couldn't edit folder.", [UK]: "Не можливо редагувати папку."},
    Form_Folder_DeleteConfirmation: {
        [EN]: "Are you sure you want to delete folder?",
        [UK]: "Ви впевнені, що бажаєте видалити папку?"
    },
    Form_Folder_DeleteError: {[EN]: "Couldn't delete folder.", [UK]: "Не можливо видалити папку."},

    // Folder fields;
    Field_Folder_Name: {[EN]: "Folder Name", [UK]: "Назва папки"},
    Field_Folder_ParentFolder: {[EN]: "Parent Folder", [UK]: "Батьківська папка"},

    // Other;
    RootFolderName: {[EN]: "ROOT", [UK]: "Коренева папка"},
    Msg_CopiedToClipboard: {[EN]: "Copied to clipboard.", [UK]: "Скопійовано до буферу обміну."}
};