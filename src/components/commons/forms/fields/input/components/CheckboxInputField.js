import React, {useState} from "react";
import Checkbox from "@salesforce/design-system-react/module/components/checkbox";

const CheckboxInputField = props => {
    const {fieldDef = {}, onChange} = props, {label, value = false} = fieldDef;

    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = event => {
        const value = event.target.checked;
        setInputValue(value);
        if (typeof onChange === "function") {
            onChange({...fieldDef, value});
        }
    };

    return (
        <Checkbox
            labels={{label}}
            variant="toggle"
            checked={inputValue}
            onChange={handleInputChange}
        />
    );
};

export default CheckboxInputField;