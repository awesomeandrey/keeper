import React from "react";
import Card from "../Card";
import OutputField from "./fields/output/OutputField";
import {Spinner} from "@salesforce/design-system-react";

import {FieldTypes} from "../../../constants";

const ViewForm = props => {
    const {label, headerActions, icon, loading, fields} = props;

    const outputFields = fields
        .filter(({type, value}) => type === FieldTypes.CHECKBOX || !!value)
        .map(_ => <OutputField key={_.name} {..._}/>);

    return (
        <Card
            className="height-fill"
            label={label}
            headerActions={headerActions}
            icon={icon}
        >
            {loading && <Spinner variant="brand" size="medium"/>}
            <div className="slds-p-horizontal--x-small">
                {outputFields}
            </div>
        </Card>
    );
};

export default ViewForm;