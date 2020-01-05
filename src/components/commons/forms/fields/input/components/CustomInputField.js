import React from "react";
import Input from "@salesforce/design-system-react/module/components/input";

import {Button} from "@salesforce/design-system-react";
import {Label} from "../../../../../../modules/translation/LabelService";

const _getValueFromInput = event => event.target.value;

const CustomInputField = props => {
    const {fieldDef = {}, onChange, onDelete} = props, {label = "", value = ""} = fieldDef;

    const handleChangeFieldDefinition = updatedFieldDev => {
        if (typeof onChange === "function") {
            onChange({...fieldDef, ...updatedFieldDev});
        }
    };

    const handleFieldLabelChange = event => {
        handleChangeFieldDefinition({
            label: _getValueFromInput(event)
        });
    };

    const handleFieldValueChange = event => {
        handleChangeFieldDefinition({
            value: _getValueFromInput(event)
        });
    };

    const handleDeleteField = event => {
        event.stopPropagation();
        if (typeof onDelete === "function") {
            onDelete(fieldDef);
        }
    };

    return (
        <div className="slds-grid slds-p-horizontal--x-small slds-m-top--small">
            <div className="slds-col slds-size_10-of-12">
                <div className="slds-box slds-box--x-small slds-theme_shade">
                    <Input
                        label={Label.Grl_Form_CustomFieldName}
                        value={label}
                        onChange={handleFieldLabelChange}
                    />
                    <Input
                        label={Label.Grl_Form_CustomFieldValue}
                        value={value}
                        onChange={handleFieldValueChange}
                    />
                </div>
            </div>
            <div className="slds-col slds-size_2-of-12 slds-align_absolute-center">
                <Button
                    iconCategory="utility"
                    iconName="delete"
                    iconPosition="left"
                    label={Label.Grl_Form_DeleteField}
                    responsive
                    onClick={handleDeleteField}
                />
            </div>
        </div>
    );
};

export default CustomInputField;