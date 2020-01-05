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
import {Links} from "../../../constants";
import {Label} from "../../../modules/translation/LabelService";
import {Icon} from "@salesforce/design-system-react";

const Header = props => {
    const {userInfo} = props;

    const history = useHistory(),
        navService = NavigationService(history),
        proxiedUser = new UserProxy(userInfo);

    let navigationOptions = [
        {label: Label.LinkVault, value: Links.VAULT},
        {label: Label.LinkSetup, value: Links.SETUP},
        {label: Label.LinkLogout, value: Links.DEFAULT}
    ];
    if (!userInfo) {
        navigationOptions = navigationOptions
            .filter(({value}) => value !== Links.VAULT);
    }

    const lastActivityDateFieldDef = proxiedUser.castToFieldsForPeekView()[0];
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
                userInfo
                && <GlobalHeaderProfile
                    avatar={<Icon category="action" name="new_person_account" size="x-small"/>}
                    popover={
                        <Popover
                            heading={proxiedUser.name}
                            body={<OutputField {...lastActivityDateFieldDef}/>}
                            align="bottom right"
                        />
                    }
                />
            }
        </GlobalHeader>
    );
};

export default Header;