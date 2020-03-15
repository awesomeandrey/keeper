import RecordProxy from "../common/RecordProxy";
import FieldNames from "./credential-field-names";
import FolderProxy from "../folder/FolderProxy";
import getCredentialFieldDefinitions from "./credential-field-defs";

import {FieldTypes} from "../../../../constants.js";

/**
 * Sample record structure:
 * {
 *      id: "",  Unique record identifier;
 *      [standardFieldName]: "",
 *      [customFieldName]: {
 *          label, name, value, type: CUSTOM
 *      }
 * }
 */

class CredentialProxy extends RecordProxy {
    constructor(props) {
        super(props);
        this.fields = getCredentialFieldDefinitions();
    }

    static init(credential) {
        return new this(credential);
    }

    get fieldsForView() {
        return [
            this.fields[FieldNames.NAME],
            this.fields[FieldNames.USERNAME_OR_LOGIN],
            this.fields[FieldNames.PASSWORD],
            this.fields[FieldNames.WEBSITE]
        ];
    }

    get fieldsForCreate() {
        return this.fieldsForView;
    }

    get fieldsForEdit() {
        return this.fieldsForView;
    }

    castToFields(fieldDefinitions, sourceObj) {
        const standardInputFields = super.castToFields(fieldDefinitions, sourceObj);
        // Define custom fields;
        const createdDateNumKey = "createdDateNum", customInputFields = Object.keys(sourceObj)
            .filter(propName => {
                // Filter custom field definitions;
                let fieldDef = sourceObj[propName];
                return !!fieldDef && typeof fieldDef === "object" && fieldDef.type === FieldTypes.CUSTOM;
            })
            .map(propName => {
                sourceObj[propName][createdDateNumKey] = sourceObj[propName][createdDateNumKey] || new Date().getTime();
                return sourceObj[propName];
            })
            .sort((f1, f2) => {
                // Sort custom fields by createdDate;
                return f1[createdDateNumKey] - f2[createdDateNumKey];
            });
        return [...standardInputFields, ...customInputFields];
    }

    castToRecord(fieldDefinitions) {
        let objWithStandardFields = RecordProxy.castToRecord(fieldDefinitions, {}), objWithCustomFields = {};
        objWithStandardFields[FieldNames.ID] = this.recordId;
        if (Array.isArray(fieldDefinitions)) {
            objWithCustomFields = fieldDefinitions
                .filter(({type, label}) => type === FieldTypes.CUSTOM && !!label)
                .reduce((resultObj, fieldDef) => {
                    resultObj[fieldDef.name] = fieldDef;
                    return resultObj;
                }, objWithCustomFields);
        }
        let resultObj = {...objWithStandardFields, ...objWithCustomFields};
        return Object.keys(resultObj).reduce((recordObj, key) => {
            let objValue = recordObj[key];
            if (typeof objValue !== "boolean" && !objValue) {
                // Perform record data cleanup;
                delete recordObj[key];
            }
            return recordObj;
        }, resultObj);
    }

    // Custom methods;

    relateToFolder(credential, folder) {
        if (!!folder && typeof folder === "object") {
            let proxiedFolder = new FolderProxy(folder);
            credential[FieldNames.FOLDER_ID] = proxiedFolder.recordId;
        }
    }

    castToChangeFolderFields(folders) {
        let nameFieldDef = this.fields[FieldNames.NAME];
        nameFieldDef.required = false;
        nameFieldDef.readonly = true;
        let folderFieldDef = this.fields[FieldNames.FOLDER_ID];
        folderFieldDef = FolderProxy.populateWithFolderOptions(folderFieldDef, folders);
        return super.castToFields([folderFieldDef, nameFieldDef], this.record);
    }
}

export default CredentialProxy;