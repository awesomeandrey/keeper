import CommonFields from "./common-fields";

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

    toViewFields() {
        return this.toFields(this.fieldsForView, this.record);
    }

    toCreateFields() {
        return this.toFields(this.fieldsForCreate, {});
    }

    toEditFields() {
        return this.toFields(this.fieldsForEdit, this.record);
    }

    readFields(fieldDefinitions) {
        let tempRecord = RecordProxy.castToRecord(fieldDefinitions, {});
        this.record = {...this.record, ...tempRecord};
        return this;
    }

    toFields(fieldDefinitions, sourceObj) {
        return RecordProxy.castToFields(fieldDefinitions, sourceObj);
    }

    toRecord(fieldDefinitions = []) {
        if (!fieldDefinitions.length) {
            return {...this.record};
        }
        return RecordProxy.castToRecord(fieldDefinitions, this.record);
    }
}

export default RecordProxy;