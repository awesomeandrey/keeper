import React, {useState} from "react";
import Button from "@salesforce/design-system-react/module/components/button";

import IpcRenderController from "../../../../../../controllers/IpcRenderController";

import {Label} from "../../../../../../modules/translation/LabelService";
import {Channels} from "../../../../../../constants";

const FolderInputField = props => {
    const {fieldDef = {}, onChange} = props, {label, value = "", required = false, readonly = false} = fieldDef;

    const [error, setError] = useState("");

    const handleSelectFolder = () => {
        IpcRenderController.performAction({channelName: Channels.CHOOSE_FOLDER})
            .then(folderPath => {
                if (required && !folderPath) {
                    setError(Label.Form_Grl_RequiredField);
                    return;
                }
                setError("");
                if (typeof onChange === "function") {
                    onChange({...fieldDef, value: folderPath});
                }
            });
    };

    return (
        <div className="slds-form-element slds-m-bottom--xx-small">
            <div className="slds-form-element__label">
                {required && <abbr className="slds-required" title="required">*</abbr>}{label}
            </div>
            <div className="slds-form-element__control">
                <div className="slds-file-selector slds-file-selector_files">
                    <label className="slds-file-selector__body">
                        <Button
                            label={Label.Form_Grl_SelectFolder}
                            iconCategory="utility"
                            iconName="open_folder"
                            iconPosition="left"
                            disabled={readonly}
                            onClick={handleSelectFolder}
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

export default FolderInputField;