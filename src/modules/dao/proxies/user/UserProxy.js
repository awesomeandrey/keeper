import RecordProxy from "../common/RecordProxy";
import FieldNames from "./user-field-names"
import getUserFieldDefinitions from "./user-field-defs";

class UserProxy extends RecordProxy {
    constructor(props) {
        super(props);
        this.fields = getUserFieldDefinitions();
    }

    static init(user) {
        return new this(user);
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
        return this.record[FieldNames.LAST_MODIFIED_DATE] = value;
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

    get fieldsForKeyConfirmation() {
        return [
            this.fields[FieldNames.FILEPATH],
            this.fields[FieldNames.ENCRYPTION_KEY]
        ];
    }

    get fieldsForKeyChange() {
        return [
            this.fields[FieldNames.ENCRYPTION_KEY],
            this.fields[FieldNames.NEW_ENCRYPTION_KEY]
        ];
    }

    get fieldForFileImport() {
        return this.fields[FieldNames.FILEPATH_FOR_IMPORT];
    }

    get fieldForFileExport() {
        return this.fields[FieldNames.FOLDER_FOR_EXPORT];
    }

    castToFieldsForKeyConfirmation() {
        return this.castToFields(this.fieldsForKeyConfirmation, this.record);
    }

    castToFieldsForKeyChange() {
        return this.castToFields(this.fieldsForKeyChange, {});
    }

    castToFieldsForPeekView() {
        return this.castToFields(
            [this.fields[FieldNames.LAST_MODIFIED_DATE]], this.record
        );
    }
}

export default UserProxy;