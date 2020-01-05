const CredentialsDAO = require("../../dao/CredentialsDAO");

class CredentialService {
    constructor(fileData) {
        this.credentialsDAO = CredentialsDAO.getInstance(fileData);
    }

    getAllCredentials() {
        return this.credentialsDAO.selectCredentialsAll();
    }

    saveCredential(credential) {
        return this.credentialsDAO.saveCredential(credential);
    }

    deleteCredential(credential) {
        return this.credentialsDAO.deleteCredential(credential);
    }
}

module.exports = CredentialService;