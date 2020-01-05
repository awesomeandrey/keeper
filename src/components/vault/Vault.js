import React, {useState, useCallback} from "react";
import KeyConfirmationPanel from "./panels/KeyConfirmationPanel";
import Header from "../commons/header/Header";
import NavigationContainer from "./panels/navigation/NavigationContainer";
import CredentialContainer from "./panels/сredential/CredentialContainer";

import useGlobal from "../../modules/globalState";

const VaultContainer = () => {
    const [globalState, globalActions] = useGlobal(), {userInfo} = globalState;

    const [keyConfirmed, confirmKey] = useState(false);

    const onConfirm = useCallback(userWithEncKey => {
        globalActions.setUserInfo(userWithEncKey);
        confirmKey(true);
    }, [globalActions]);

    if (!keyConfirmed) {
        return (
            <KeyConfirmationPanel
                user={userInfo}
                onConfirm={onConfirm}
            />
        );
    } else {
        return (
            <Vault user={userInfo}/>
        );
    }
};

const Vault = props => {
    const {user} = props;
    return (
        <div className="keeper-pane__vault height-fill">
            <Header userInfo={user}/>
            <div className="slds-grid slds-gutters_xx-small slds-p-around--x-small width-fill height-fill">
                <div className="slds-col slds-size_4-of-12">
                    <NavigationContainer {...props}/>
                </div>
                <div className="slds-col slds-size_8-of-12">
                    <CredentialContainer {...props}/>
                </div>
            </div>
        </div>
    );
};

export default VaultContainer;