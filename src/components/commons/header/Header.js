import React from "react";
import GlobalHeader from "@salesforce/design-system-react/module/components/global-header";
import GlobalHeaderProfile from "@salesforce/design-system-react/module/components/global-header/profile";
import Popover from "@salesforce/design-system-react/module/components/popover/popover";
import GlobalHeaderSetup from "@salesforce/design-system-react/module/components/global-header/setup";
import MenuDropdown from "@salesforce/design-system-react/module/components/menu-dropdown/menu-dropdown";
import OutputField from "../forms/fields/output/OutputField";

import NavigationService from "../../../modules/services/NavigationService";
import UserProxy from "../../../modules/dao/proxies/user/UserProxy";

import {useHistory} from "react-router-dom";
import {FieldTypes, Links} from "../../../constants";
import {Label} from "../../../modules/translation/LabelService";
import {Icon} from "@salesforce/design-system-react";

const Header = props => {
    const {user, appVersion} = props;

    const history = useHistory(),
        navService = NavigationService(history),
        userProxy = new UserProxy(user);

    let navigationOptions = [
        {label: Label.LinkVault, value: Links.VAULT},
        {label: Label.LinkSetup, value: Links.SETUP},
        {label: Label.LinkQuit, value: Links.DEFAULT}
    ];
    if (!user) {
        navigationOptions = navigationOptions
            .filter(({value}) => value !== Links.VAULT);
    }

    const peekViewFields = userProxy.castToFieldsForPeekView();
    // Compose ad-hoc field definition for rendering application version;
    peekViewFields.push({
        label: Label.Grl_AppVersion,
        name: "appVersion",
        type: FieldTypes.TEXT,
        value: appVersion
    });

    return (
        <GlobalHeader logoSrc="logo.ico">
            <GlobalHeaderSetup
                dropdown={
                    <MenuDropdown
                        options={navigationOptions}
                        width="x-small"
                        onSelect={option => navService.to(option.value)}
                    />
                }
            />
            {
                user && <GlobalHeaderProfile
                    avatar={<Icon category="action" name="new_person_account" size="x-small"/>}
                    popover={
                        <Popover
                            heading={userProxy.name}
                            body={peekViewFields.map(_ => <OutputField {..._} allowCopyToClipboard={false}/>)}
                            align="bottom right"
                        >
                            <span/>
                        </Popover>
                    }
                />
            }
        </GlobalHeader>
    );
};

// const

export default Header;