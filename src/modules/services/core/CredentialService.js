const CredentialsDAO = require("../../dao/CredentialsDAO");
const CommonFieldNames = require("../../dao/proxies/common/common-fields");

class CredentialService {
    constructor(fileData) {
        this.credentialsDAO = CredentialsDAO.getInstance(fileData);
    }

    getAllCredentials() {
        return this.credentialsDAO.selectCredentialsAll();
    }

    saveCredential(credential) {
        const recordId = credential[CommonFieldNames.ID],
            foundCredential = this.credentialsDAO.selectCredentialById(recordId);
        if (foundCredential) {
            // Re-write completely (due to 'custom fields' feature);
            let isDeleted = this.deleteCredential(foundCredential);
            if (!isDeleted) {
                throw new Error("Internal error occurred.");
            }
            return this.credentialsDAO.persistCredential(credential)
        } else {
            return this.credentialsDAO.saveCredential(credential);
        }
    }

    deleteCredential(credential) {
        return this.credentialsDAO.deleteCredential(credential);
    }
}

module.exports = CredentialService;