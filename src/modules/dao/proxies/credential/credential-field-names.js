const CommonFields = require("../common/common-fields");

const CredentialFieldNames = Object.assign(CommonFields, {
    FOLDER_ID: "folderId",
    USERNAME_OR_LOGIN: "usernameOrLogin",
    PASSWORD: "password",
    WEBSITE: "website"
});

module.exports = CredentialFieldNames;