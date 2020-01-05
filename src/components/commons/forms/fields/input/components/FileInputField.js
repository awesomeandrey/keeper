import React, {useState} from "react";
import Button from "@salesforce/design-system-react/module/components/button";

import {Label} from "../../../../../../modules/translation/LabelService";

const ALLOWED_FILE_TYPES = ["application/json"];

const FileInputField = props => {
    const {fieldDef = {}, onChange} = props, {label, value = "", required = false, readonly = false} = fieldDef;

    const [inputElementRef, setInputElementRef] = useState(null);
    const [error, setError] = useState("");

    const handleChange = event => {
        const selectedFile = event.target.files[0];
        if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
            setError(Label.Form_Grl_UnsupportedFileType);
            return;
        } else if (required && !selectedFile.path) {
            setError(Label.Form_Grl_RequiredField);
            return;
        }
        setError("");
        if (typeof onChange === "function") {
            onChange({...fieldDef, value: selectedFile.path});
        }
    };

    return (
        <div className="slds-form-element slds-m-bottom--xx-small">
            <div className="slds-form-element__label">
                {required && <abbr className="slds-required" title="required">*</abbr>}{label}
            </div>
            <div className="slds-form-element__control">
                <div className="slds-file-selector slds-file-selector_files">
                    <input type="file"
                           readOnly={readonly}
                           accept="application/JSON"
                           ref={el => setInputElementRef(el)}
                           onChange={handleChange}
                           className="slds-file-selector__input slds-assistive-text"/>
                    <label className="slds-file-selector__body">
                        <Button
                            label={Label.Form_Grl_SelectFile}
                            iconCategory="utility"
                            iconName="upload"
                            iconPosition="left"
                            disabled={readonly}
                            onClick={() => inputElementRef.click()}
                        />
                        <span className="slds-file-selector__text">{value}</span>
                    </label>
                </div>
            </div>
            <div className="slds-form-element__help">
                {!!error && <span className="slds-text-color_error">{error}</span>}
            </div>
        </div>
    );
};

export default FileInputField;