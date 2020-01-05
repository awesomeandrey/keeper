import React from "react";
import Card from "../Card";
import OutputField from "./fields/output/OutputField";

import {Spinner} from "@salesforce/design-system-react";

const ViewForm = props => {
    const {label, headerActions, icon, loading, fields} = props;
    return (
        <Card
            className="height-fill"
            label={label}
            headerActions={headerActions}
            icon={icon}
        >
            {loading && <Spinner variant="brand" size="medium"/>}
            <div className="slds-p-horizontal--x-small">
                {
                    fields
                        .filter(_ => !!_.value)
                        .map(_ => <OutputField key={_.name} {..._}/>)
                }
            </div>
        </Card>
    );
};

export default ViewForm;