import React from "react";
import Header from "../commons/header/Header";
import NavigationContainer from "./panels/navigation/NavigationContainer";
import CredentialContainer from "./panels/сredential/CredentialContainer";
import FolderContainer from "./panels/folder/FolderContainer";

import useGlobal from "../../modules/globalState";

const Vault = () => {
    const [globalState] = useGlobal(), {userInfo} = globalState;
    return (
        <div className="keeper-pane__vault height-fill">
            <Header user={userInfo}/>
            <div className="slds-grid slds-gutters_xx-small slds-p-around--x-small width-fill height-fill">
                <div className="slds-col slds-size_4-of-12">
                    <NavigationContainer user={userInfo}/>
                </div>
                <div className="slds-col slds-size_8-of-12">
                    <CredentialContainer user={userInfo}/>
                    <FolderContainer user={userInfo}/>
                </div>
            </div>
        </div>
    );
};

export default Vault;