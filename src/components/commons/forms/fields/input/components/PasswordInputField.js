import React, {useState} from "react";
import Input from "@salesforce/design-system-react/module/components/input";
import Tooltip from "@salesforce/design-system-react/module/components/tooltip";
import InputIcon from "@salesforce/design-system-react/module/components/icon/input-icon";

import PasswordGenerator from "generate-password";

import {test} from "../../../../../../modules/util/InputValidator";
import {Label} from "../../../../../../modules/translation/LabelService";

const PasswordInputField = props => {
    const {fieldDef = {}, onChange} = props, {label, value = "", required = false, pattern, helpText} = fieldDef;

    const [inputValue, setInputValue] = useState(value);
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);

    const updateInputValue = value => {
        setInputValue(value);
        if (!!pattern) {
            let errorMessage = test(value, pattern) ? "" : Label.Form_Grl_WrongValue;
            setError(errorMessage);
        }
        if (typeof onChange === "function") {
            onChange({...fieldDef, value});
        }
    };

    const handleInputChange = event => {
        const value = event.target.value.trim();
        updateInputValue(value);
    };

    const handleRefreshPassword = () => {
        let generatedPasswords = PasswordGenerator.generateMultiple(3, {
            length: 17,
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: true
        });
        updateInputValue(generatedPasswords[0]);
    };

    const inputType = visible ? "text" : "password", iconName = visible ? "hide" : "preview";
    return (
        <Input
            label={label}
            className="slds-m-bottom--xx-small"
            placeholder={Label.Form_Grl_InputPlaceholder}
            required={required}
            errorText={error}
            type={inputType}
            iconLeft={
                <InputIcon
                    name="refresh"
                    category="utility"
                    onClick={handleRefreshPassword}
                />
            }
            iconRight={
                <InputIcon
                    name={iconName}
                    category="utility"
                    onClick={() => setVisible(!visible)}
                />
            }
            fieldLevelHelpTooltip={
                helpText && <Tooltip align="top left" content={helpText}/>
            }
            value={inputValue}
            onChange={handleInputChange}
        />
    );
};

export default PasswordInputField;