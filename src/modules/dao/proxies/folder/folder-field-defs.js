import FolderFieldNames from "./folder-field-names";

import {FieldTypes} from "../../../../constants";
import {Label} from "../../../translation/LabelService";

export default () => ({
    [FolderFieldNames.PARENT_ID]: {
        label: Label.Field_Folder_ParentFolder,
        name: FolderFieldNames.PARENT_ID,
        type: FieldTypes.PICKLIST
    },
    [FolderFieldNames.NAME]: {
        label: Label.Field_Folder_Name,
        name: FolderFieldNames.NAME,
        type: FieldTypes.TEXT,
        required: true
    },
});