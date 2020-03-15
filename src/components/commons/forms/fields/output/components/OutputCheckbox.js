import React from "react";
import Checkbox from "@salesforce/design-system-react/module/components/checkbox";

const OutputCheckbox = props => {
    const {label, value = false} = props;
    return (
        <Checkbox
            labels={{label}}
            variant="toggle"
            checked={Boolean(value)}
            readOnly={true}
        />
    );
};

export default OutputCheckbox;