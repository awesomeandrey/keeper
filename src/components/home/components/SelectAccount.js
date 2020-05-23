import React from "react";
import WelcomeMatTile from "@salesforce/design-system-react/module/components/welcome-mat/tile";
import Icon from "@salesforce/design-system-react/module/components/icon";
import EmptyArea from "../../commons/EmptyArea";

import {Label} from "../../../modules/translation/LabelService";

const SelectAccount = props => {
    const {proxiedUsers, onSelect} = props;

    const getIconName = proxiedUser => {
        if (proxiedUser.saveKey) return "user";
        return "privately_shared";
    };

    if (!proxiedUsers.length) {
        return <EmptyArea label={Label.Grl_NoAccountsFound}/>;
    } else {
        return proxiedUsers.map(_ => (
            <div key={_.recordId} onClick={() => onSelect(_)} className="slds-m-bottom--x-small">
                <WelcomeMatTile title={_.name} icon={<Icon category="utility" name={getIconName(_)}/>}/>
            </div>
        ));
    }
};

export default SelectAccount;