import React, {useState} from "react";
import NavigationSection from "../decorators/NavigationSection";
import Folders from "./Folders";
import NavigationItem from "../decorators/NavigationItem";
import Credentials from "./Credentials";
import Dropdown from "@salesforce/design-system-react/module/components/menu-dropdown/menu-dropdown";

import CustomEvents from "../../../../../modules/util/CustomEvents";

import {ApplicationEvents} from "../../../../../constants";
import {Label} from "../../../../../modules/translation/LabelService";

const Folder = props => {
    const [isOpened, setOpened] = useState(false);

    const {folder} = props, {id, name: folderName, folders, credentials} = folder;

    const handleClick = event => {
        event.stopPropagation();
        setOpened(!isOpened);
        CustomEvents.fire({
            eventName: ApplicationEvents.SELECT_FOLDER,
            detail: {id, folderName}
        });
    };

    return (
        <NavigationSection
            opened={isOpened}
            navItem={
                <NavigationItem
                    id={id}
                    label={folderName}
                    labelClassName="slds-text-title_caps"
                    iconName={isOpened ? "opened_folder" : "open_folder"}
                    onClick={handleClick}
                >
                    <Dropdown
                        iconCategory="utility"
                        width="xx-small"
                        iconName="threedots_vertical"
                        iconSize="small"
                        iconVariant="container"
                        onClick={e => e.stopPropagation()}
                        onSelect={({value}) => {
                            if (value === "edit") {
                                CustomEvents.fire({eventName: ApplicationEvents.EDIT_FOLDER, detail: folder});
                            } else if (value === "delete") {
                                CustomEvents.fire({eventName: ApplicationEvents.DELETE_FOLDER, detail: folder});
                            }
                        }}
                        options={[
                            {
                                label: Label.Btn_Edit,
                                value: "edit",
                                leftIcon: {name: "edit", category: "utility"}
                            }, {
                                label: Label.Btn_Delete,
                                value: "delete",
                                leftIcon: {name: "delete", category: "utility"}
                            }
                        ]}
                    />
                </NavigationItem>
            }
        >
            <Folders folders={folders || []}/>
            <Credentials credentials={credentials || []}/>
        </NavigationSection>
    );
};

export default Folder;