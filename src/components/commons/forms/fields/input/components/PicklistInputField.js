import React, {useState} from "react";
import {Picklist} from "@salesforce/design-system-react";

import {Label} from "../../../../../../modules/translation/LabelService";

const PicklistInputField = props => {
    const {fieldDef = {}, onChange} = props, {label, value, options = [], required} = fieldDef;

    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = option => {
        const value = option.value;
        setInputValue(value);
        if (typeof onChange === "function") {
            onChange({...fieldDef, value});
        }
    };

    return (
        <Picklist
            label={label}
            placeholder={Label.Form_Grl_SelectOption}
            className="slds-m-top--x-small"
            value={inputValue}
            required={required}
            options={options}
            disabled={!options.length}
            onSelect={handleInputChange}
        />
    );
};

export default PicklistInputField;