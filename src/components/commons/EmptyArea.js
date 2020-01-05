import React from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";

const EmptyArea = props => {
    const {iconName = "empty", label = "N/A"} = props;
    return (
        <div className="slds-align_absolute-center height-fill">
            <p className="slds-text-body_small slds-m-vertical--large">
                <Icon category="standard" name={iconName} size="small"/>
                <span className="slds-m-left--small">{label}</span>
            </p>
        </div>
    );
};

export default EmptyArea;