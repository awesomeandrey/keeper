import React from "react";
import Dropdown from "@salesforce/design-system-react/module/components/menu-dropdown";
import DropdownTrigger from "@salesforce/design-system-react/module/components/menu-dropdown/button-trigger";
import Button from "@salesforce/design-system-react/module/components/button";

import CustomEvents from "../../../../modules/util/CustomEvents";
import {ApplicationEvents} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const ActionsPanel = () => {

    const handleSelectOption = option => {
        const {value} = option;
        if (value === 1) {
            CustomEvents.fire({eventName: ApplicationEvents.CREATE_CRED_ITEM});
        } else if (value === 2) {
            CustomEvents.fire({eventName: ApplicationEvents.CREATE_FOLDER});
        }
    };

    const options = [
        {label: Label.Grl_Credential, value: 1, leftIcon: {name: "lock", category: "utility"}},
        {label: Label.Grl_Folder, value: 2, leftIcon: {name: "open_folder", category: "utility"}}
    ];
    return (
        <Dropdown
            options={options}
            width="x-small"
            onSelect={handleSelectOption}
        >
            <DropdownTrigger>
                <Button
                    iconCategory="utility"
                    iconName="down"
                    iconPosition="right"
                    label={Label.Btn_CreateNew}
                    variant="brand"
                />
            </DropdownTrigger>
        </Dropdown>
    );
};

export default ActionsPanel;