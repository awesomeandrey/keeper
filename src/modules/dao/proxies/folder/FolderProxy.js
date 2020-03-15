import RecordProxy from "../common/RecordProxy";
import FieldNames from "./folder-field-names";
import getFolderFieldDefinitions from "./folder-field-defs";

import {Label} from "../../../translation/LabelService";

class FolderProxy extends RecordProxy {
    constructor(props) {
        super(props);
        this.fields = getFolderFieldDefinitions();
    }

    static init(folder) {
        return new this(folder);
    }

    static populateWithFolderOptions(fieldDef, folders) {
        const rootFolderOption = {label: Label.RootFolderName, value: ""};
        if (!fieldDef.value) {
            fieldDef.value = rootFolderOption.value;
        }
        fieldDef.options = folders.map(_ => ({label: _[FieldNames.NAME], value: _[FieldNames.ID]}));
        fieldDef.options.unshift(rootFolderOption);
        return fieldDef;
    }

    get fieldsForView() {
        return [
            this.fields[FieldNames.PARENT_ID],
            this.fields[FieldNames.NAME]
        ];
    }

    get fieldsForCreate() {
        return [
            this.fields[FieldNames.PARENT_ID],
            this.fields[FieldNames.NAME]
        ];
    }

    get fieldsForEdit() {
        return [
            this.fields[FieldNames.PARENT_ID],
            this.fields[FieldNames.NAME]
        ];
    }

    castToCreateFields(folders, parentFolder) {
        return super.castToCreateFields()
            .map(fieldDef => {
                if (fieldDef.name === FieldNames.PARENT_ID) {
                    fieldDef = FolderProxy.populateWithFolderOptions(fieldDef, folders);
                    if (parentFolder) {
                        fieldDef.value = parentFolder[FieldNames.ID];
                    }
                }
                return fieldDef;
            });
    }

    castToEditFields(folders) {
        return super.castToEditFields()
            .map(fieldDef => {
                if (fieldDef.name === FieldNames.PARENT_ID) {
                    fieldDef = FolderProxy.populateWithFolderOptions(fieldDef, folders);
                    fieldDef.options = fieldDef.options.filter(_ => _.value !== this.record[FieldNames.ID]);
                }
                return fieldDef;
            });
    }
}

export default FolderProxy;