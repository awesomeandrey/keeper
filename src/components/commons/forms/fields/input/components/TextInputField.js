import React, {useState} from "react";
import Input from "@salesforce/design-system-react/module/components/input";

import {Label} from "../../../../../../modules/translation/LabelService";

const TextInputField = props => {
    const {fieldDef = {}, onChange} = props, {label, value = "", readonly = false, required = false} = fieldDef;

    const [inputValue, setInputValue] = useState(value);
    const [error, setError] = useState("");

    const handleInputChange = event => {
        const value = event.target.value, isValid = required ? !!value.trim() : true;
        setInputValue(value);
        setError(!isValid ? Label.Form_Grl_RequiredField : "");
        if (typeof onChange === "function") {
            onChange({...fieldDef, value: value.trim()});
        }
    };

    return (
        <Input
            label={label}
            className="slds-m-bottom--xx-small"
            placeholder={Label.Form_Grl_InputPlaceholder}
            required={required}
            readOnly={readonly}
            value={inputValue}
            errorText={error}
            onChange={handleInputChange}
        />
    );
};

export default TextInputField;