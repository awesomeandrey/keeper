import React from "react";

const NavigationSection = props => {
    const {navItem, opened} = props;
    return (
        <div className="slds-nav-vertical__section">
            {navItem}
            <div className={opened ? "slds-p-left--medium" : "slds-hide"}>
                {props.children}
            </div>
        </div>
    );
};

export default NavigationSection;