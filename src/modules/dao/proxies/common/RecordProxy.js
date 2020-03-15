import CommonFields from "./common-fields";

/**
 * Sample record structure:
 * {
 *      id: "",  Unique record identifier;
 *      [standardFieldName]: ""
 * }
 */

class RecordProxy {
    constructor(record) {
        this.record = record || {};
    }

    static castToFields(fieldDefinitions, sourceObj = {}) {
        return fieldDefinitions.map(fieldDef => {
            let {name} = fieldDef, fieldValue = sourceObj[name];
            fieldDef.value = fieldValue || "";
            return fieldDef;
        });
    }

    static castToRecord(fieldDefinitions, sourceObj) {
        let obj = {...sourceObj};
        if (Array.isArray(fieldDefinitions)) {
            obj = fieldDefinitions.reduce((obj, {name, value}) => {
                obj[name] = value;
                return obj;
            }, obj);
        }
        return obj;
    }

    static sameRecords(rec1, rec2) {
        return !!rec1
            && !!rec2
            && typeof rec1 === "object"
            && typeof rec2 === "object"
            && rec1[CommonFields.ID] === rec2[CommonFields.ID];
    }

    get id() {
        return this.recordId;
    }

    get recordId() {
        return this.record[CommonFields.ID];
    }

    get name() {
        return this.record[CommonFields.NAME];
    }

    get fieldsForView() {
        return [];
    }

    get fieldsForCreate() {
        return [];
    }

    get fieldsForEdit() {
        return [];
    }

    castToViewFields() {
        return this.castToFields(this.fieldsForView, this.record);
    }

    castToCreateFields() {
        return this.castToFields(this.fieldsForCreate, {});
    }

    castToEditFields() {
        return this.castToFields(this.fieldsForEdit, this.record);
    }

    readFields(fieldDefinitions) {
        this.record = this.castToRecord(fieldDefinitions, this.record);
        return this;
    }

    // Methods below can be overridden;

    castToFields(fieldDefinitions, sourceObj) {
        return RecordProxy.castToFields(fieldDefinitions, sourceObj);
    }

    castToRecord(fieldDefinitions = []) {
        if (!fieldDefinitions.length) {
            return {...this.record};
        }
        return RecordProxy.castToRecord(fieldDefinitions, this.record);
    }
}

export default RecordProxy;