const shortId = require("shortid");
const CommonFields = require("../proxies/common/common-fields");

const ID = CommonFields.ID;

class GenericDAO {
    constructor(lowDb) {
        this.lowDB = lowDb;
    }

    selectById({tableName, id}) {
        return this.lowDB
            .get(tableName)
            .find({[ID]: id})
            .value();
    }

    selectByField({tableName, key, value}) {
        return this.lowDB
            .get(tableName)
            .filter(_ => _[key] === value)
            .value();
    }

    selectAll({tableName}) {
        return this.lowDB
            .get(tableName)
            .cloneDeep()
            .value();
    }

    persist({tableName, record}) {
        let recordId = record[ID];
        if (!recordId) {
            recordId = record[ID] = shortId.generate();
        }
        this.lowDB
            .get(tableName)
            .push(record)
            .write();
        return this.selectById({tableName, [ID]: recordId});
    }

    save({tableName, record}) {
        let recordId = record[ID];
        if (!recordId) {
            // Create new resource;
            return this.persist({tableName, record});
        }
        let lookedUpRecord = this.lowDB
            .get(tableName)
            .find({[ID]: recordId})
            .value();
        if (lookedUpRecord) {
            // Update existing record;
            this.lowDB
                .get(tableName)
                .find({[ID]: recordId})
                .assign(record)
                .write();
        } else {
            // Create new resource;
            record[ID] = undefined;
            return this.persist({tableName, record});
        }
        return this.selectById({tableName, [ID]: recordId});
    }

    delete({tableName, record}) {
        const recordId = record[ID];
        if (recordId) {
            this.lowDB
                .get(tableName)
                .remove({[ID]: recordId})
                .write();
            return !this.selectById({tableName, id: recordId});
        }
        return false;
    }
}

module.exports = GenericDAO;