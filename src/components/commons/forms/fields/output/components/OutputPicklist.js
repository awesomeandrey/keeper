import React from "react";
import {Picklist} from "@salesforce/design-system-react";

const OutputPicklist = props => {
    const {label, value, options} = props;

    return (
        <Picklist
            label={label}
            disabled={true}
            value={value}
            options={options}
        />
    );
};

export default OutputPicklist;