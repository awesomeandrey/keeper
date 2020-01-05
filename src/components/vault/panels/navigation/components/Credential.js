import React from "react";
import NavigationItem from "../decorators/NavigationItem";

import CustomEvents from "../../../../../modules/util/CustomEvents";

import {ApplicationEvents} from "../../../../../constants";

const Credential = props => {
    const {credential} = props;

    const handleClick = event => {
        event.stopPropagation();
        CustomEvents.fire({eventName: ApplicationEvents.SELECT_CRED_ITEM, detail: credential});
    };

    return (
        <NavigationItem
            id={credential.recordId}
            label={credential.name}
            iconName="drag_and_drop"
            onClick={handleClick}
        />
    );
};

export default Credential;