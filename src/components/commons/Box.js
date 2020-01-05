import React from "react";

const Box = props => {
    return (
        <div className="slds-box slds-box--small slds-theme_shade slds-theme_alert-texture slds-scrollable height-fill">
            {props.children}
        </div>
    );
};

export default Box;