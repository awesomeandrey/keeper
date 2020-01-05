const GenericDAO = require("./core/GenericDAO");
const FileService = require("../io/FileService");

const {initLowDbConnection} = require("./core/LowDbInitializer");

const ACCOUNTS = "accounts";

/**
 * User account record structure;
 *
 * {
 *     name: "Account Name",
 *     filePath: "|default file path|",
 *     saveEncryptionKey: "",
 *     encryptionKey: "",
 *     lastModifiedDate: ""
 * }
 */

class ConfigsDAO extends GenericDAO {
    constructor(params) {
        super(params);
        this.lowDB.defaults({[ACCOUNTS]: []}).write();
    }

    static getInstance() {
        const lowDb = initLowDbConnection({
            sourceFilePath: FileService.resolveConfigFile()
        });
        return new this(lowDb);
    }

    selectAccountById(id) {
        return super.selectById({tableName: ACCOUNTS, id});
    }

    selectAllAccounts() {
        return super.selectAll({tableName: ACCOUNTS});
    }

    saveAccount(account = {}) {
        return super.save({tableName: ACCOUNTS, record: account});
    }

    deleteAccount(account) {
        return super.delete({tableName: ACCOUNTS, record: account});
    }
}

module.exports = ConfigsDAO;