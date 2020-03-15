import React, {useState, useEffect} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import Card from "../../../commons/Card";
import Dropdown from "@salesforce/design-system-react/module/components/menu-dropdown";
import DropdownTrigger from "@salesforce/design-system-react/module/components/menu-dropdown/button-trigger";
import Button from "@salesforce/design-system-react/module/components/button";
import ViewModeContainer from "./components/ViewModeContainer";
import {Spinner} from "@salesforce/design-system-react";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import CustomEvents from "../../../../modules/util/CustomEvents";

import {ApplicationEvents, Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const NavigationContainer = props => {
    const {user} = props;

    const [rootFolder, setRootFolder] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        CustomEvents.register({
            eventName: "keydown", callback: event => {
                if (event.key === "Escape" || event.keyCode === 27) {
                    CustomEvents.fire({eventName: ApplicationEvents.SELECT_NAV_ITEM, detail: null});
                    CustomEvents.fire({eventName: ApplicationEvents.SELECT_CRED_ITEM, detail: null});
                    CustomEvents.fire({eventName: ApplicationEvents.SELECT_FOLDER, detail: null});
                }
            }
        });
        CustomEvents.register({
            eventName: ApplicationEvents.REFRESH_DATA, callback: () => {
                setLoading(true);
                IpcRenderController.performAction({channelName: Channels.BUILD_ROOT_FOLDER_DEF, data: user})
                    .then(_ => setRootFolder(_))
                    .catch(error => {
                        CustomEvents.fire({
                            eventName: ApplicationEvents.SHOW_TOAST, detail: {
                                labels: {heading: Label.ToastErrorTitle, details: error}, variant: "error"
                            }
                        });
                    })
                    .then(() => setLoading(false));
            }
        });
        setTimeout(() => CustomEvents.fire({eventName: ApplicationEvents.REFRESH_DATA}), 10);
    }, [user]);

    return (
        <Card
            label={Label.Grl_Vault}
            className="height-fill"
            icon={<Icon category="standard" name="entitlement"/>}
            headerActions={<Actions/>}
        >
            {loading && <Spinner variant="brand" size="medium"/>}
            {!loading && <ViewModeContainer {...rootFolder}/>}
        </Card>
    );
};

const Actions = () => {

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

export default NavigationContainer;