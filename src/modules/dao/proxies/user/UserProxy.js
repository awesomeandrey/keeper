import RecordProxy from "../common/RecordProxy";
import FieldNames from "./user-field-names"
import getUserFieldDefinitions from "./user-field-defs";

class UserProxy extends RecordProxy {
    constructor(props) {
        super(props);
        this.fields = getUserFieldDefinitions();
    }

    get encryptionKey() {
        return this.record[FieldNames.ENCRYPTION_KEY];
    }

    set encryptionKey(value) {
        return this.record[FieldNames.ENCRYPTION_KEY] = value;
    }

    get lang() {
        return this.record[FieldNames.LANGUAGE];
    }

    set lang(value) {
        return this.record[FieldNames.LANGUAGE] = value;
    }

    get lastModifiedDate() {
        return this.record[FieldNames.LAST_MODIFIED_DATE];
    }

    set lastModifiedDate(value) {
        this.record[FieldNames.LAST_MODIFIED_DATE] = value;
    }

    get saveKey() {
        return this.record[FieldNames.SAVE_KEY];
    }

    get fieldsForView() {
        return [
            this.fields[FieldNames.NAME],
            this.fields[FieldNames.FILEPATH],
            this.fields[FieldNames.LANGUAGE],
            this.fields[FieldNames.SAVE_KEY],
            this.fields[FieldNames.ENCRYPTION_KEY],
            this.fields[FieldNames.LAST_MODIFIED_DATE],
        ]
    }

    get fieldsForCreate() {
        return [
            this.fields[FieldNames.NAME],
            this.fields[FieldNames.DEFAULT_CREDENTIALS_FOLDER],
            this.fields[FieldNames.LANGUAGE],
            this.fields[FieldNames.SAVE_KEY],
            this.fields[FieldNames.ENCRYPTION_KEY]
        ]
    }

    get fieldsForEdit() {
        return [
            this.fields[FieldNames.NAME],
            this.fields[FieldNames.FILEPATH],
            this.fields[FieldNames.LANGUAGE],
            this.fields[FieldNames.SAVE_KEY]
        ]
    }

    //********** Custom Field Sets **********

    get fieldForFileImport() {
        return this.fields[FieldNames.FILEPATH_FOR_IMPORT];
    }

    get fieldForFileExport() {
        return this.fields[FieldNames.FOLDER_FOR_EXPORT];
    }

    //********** Custom Methods **********

    castToFieldsForKeyConfirmation() {
        return this.toFields([
            this.fields[FieldNames.FILEPATH],
            this.fields[FieldNames.ENCRYPTION_KEY]
        ], this.record);
    }

    castToFieldsForKeyChange() {
        return this.toFields([
            this.fields[FieldNames.ENCRYPTION_KEY],
            this.fields[FieldNames.NEW_ENCRYPTION_KEY]
        ], {});
    }

    castToFieldsForPeekView() {
        return this.toFields(
            [this.fields[FieldNames.LAST_MODIFIED_DATE]], this.record
        );
    }
}

export default UserProxy;