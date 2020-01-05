import React from "react";
import TextInputField from "./components/TextInputField";
import PasswordInputField from "./components/PasswordInputField";
import WebLinkInputField from "./components/WebLinkInputField";
import CustomInputField from "./components/CustomInputField";
import CheckboxInputField from "./components/CheckboxInputField";
import FileInputField from "./components/FileInputField";
import PicklistInputField from "./components/PicklistInputField";
import FolderInputField from "./components/FolderInputField";

import {FieldTypes} from "../../../../../constants";

const InputField = props => {
    const {fieldDef = {}} = props, {type} = fieldDef;

    if (type === FieldTypes.TEXT) {
        return <TextInputField {...props}/>;
    } else if (type === FieldTypes.PASSWORD) {
        return <PasswordInputField {...props} />;
    } else if (type === FieldTypes.LINK) {
        return <WebLinkInputField {...props} />;
    } else if (type === FieldTypes.CHECKBOX) {
        return <CheckboxInputField {...props}/>
    } else if (type === FieldTypes.FILE) {
        return <FileInputField {...props}/>
    } else if (type === FieldTypes.FOLDER) {
        return <FolderInputField {...props}/>
    } else if (type === FieldTypes.PICKLIST) {
        return <PicklistInputField {...props}/>;
    } else if (type === FieldTypes.CUSTOM) {
        if (fieldDef.deleted) {
            return <span/>;
        }
        return <CustomInputField {...props}/>;
    }
    return <p>Unsupported field type.</p>
};

export default InputField;