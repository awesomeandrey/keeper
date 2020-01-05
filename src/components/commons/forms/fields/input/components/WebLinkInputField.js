import React, {useState} from "react";
import Input from "@salesforce/design-system-react/module/components/input";
import InputIcon from "@salesforce/design-system-react/module/components/icon/input-icon";

import {isValidUrl} from "../../../../../../modules/util/InputValidator";
import {Label} from "../../../../../../modules/translation/LabelService";

const WebLinkInputField = props => {
    const {fieldDef = {}, onChange} = props, {label, value = "", readonly = false} = fieldDef;

    const [inputValue, setInputValue] = useState(value);
    const [error, setError] = useState("");

    const handleInputChange = event => {
        const value = event.target.value.trim();
        setInputValue(value);
        if (!isValidUrl(value)) {
            setError(Label.Form_Grl_InvalidUrl);
        } else {
            setError("");
        }
        if (typeof onChange === "function") {
            onChange({...fieldDef, value});
        }
    };

    return (
        <Input
            label={label}
            className="slds-m-bottom--xx-small"
            placeholder={Label.Form_Grl_InputPlaceholder}
            type="url"
            iconLeft={<InputIcon name="link" category="utility"/>}
            value={inputValue}
            readOnly={readonly}
            errorText={error}
            onChange={handleInputChange}
        />
    );
};

export default WebLinkInputField;