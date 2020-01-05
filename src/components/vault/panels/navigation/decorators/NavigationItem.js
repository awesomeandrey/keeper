import React, {useState, useEffect} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";

import CustomEvents from "../../../../../modules/util/CustomEvents";

import {ApplicationEvents} from "../../../../../constants";

const NavigationItem = props => {
    const {id, label, labelClassName, iconName, onClick} = props;

    const [active, setActive] = useState(false);

    useEffect(() => {
        CustomEvents.register({
            eventName: ApplicationEvents.SELECT_NAV_ITEM,
            callback: event => setActive(event.detail === id)
        });
    }, [id]);

    const handleClick = event => {
        event.stopPropagation();
        CustomEvents.fire({eventName: ApplicationEvents.SELECT_NAV_ITEM, detail: id});
        if (typeof onClick === "function") {
            onClick(event);
        }
    };

    let classNames = ["slds-nav-vertical__item", "slds-nav-vertical__action", "slds-p-right--none"];
    if (active) {
        classNames.push("slds-is-active");
    }
    return (
        <h2 className={classNames.join(" ")} onClick={handleClick}>
            <Icon
                assistiveText={{label}}
                category="utility"
                name={iconName}
                size="small"
            />
            <span className={"slds-m-left--x-small " + labelClassName}>{label}</span>
            <div className="slds-float--right">
                {props.children}
            </div>
        </h2>
    );
};

export default NavigationItem;