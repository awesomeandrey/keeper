import React from "react";
import Tabs from "@salesforce/design-system-react/module/components/tabs";
import TabsPanel from "@salesforce/design-system-react/module/components/tabs/panel";
import Header from "../commons/header/Header";
import UserForm from "./basic/UserForm";
import ChangeEncryptionKeyPanel from "./change-enc-key/ChangeEncryptionKeyPanel";
import DataManagementPanel from "./data-management/DataManagementPanel";
import About from "./about/About";

import NavigationService from "../../modules/services/NavigationService";
import useGlobal from "../../modules/globalState";

import {useHistory} from "react-router-dom";
import {Label} from "../../modules/translation/LabelService";
import {success, info} from "../../modules/util/toastify";

const Setup = () => {
    const [globalState, globalActions] = useGlobal(), {userInfo, appVersion} = globalState;
    const history = useHistory(), navService = NavigationService(history);

    const handleCreate = userInfo => {
        globalActions.setUserInfo(userInfo);
        navService.toVault();
        success({title: Label.ToastSuccessTitle, message: Label.Form_User_Created});
    };

    const handleUpdate = userInfo => {
        globalActions.setUserInfo(userInfo);
        success({title: Label.ToastSuccessTitle, message: Label.Form_User_Edited});
    };

    const handleDelete = () => {
        globalActions.setUserInfo(null);
        navService.toDefault();
        info({title: Label.ToastSuccessTitle, message: Label.Form_User_Deleted});
    };

    return (
        <div className="keeper-pane__setup height-fill">
            <Header user={userInfo} appVersion={appVersion}/>
            <div className="slds-align--absolute-center slds-m-top--medium">
                <div style={{minWidth: "40rem"}}>
                    <Tabs variant="default"
                          className="slds-box slds-box--small slds-p-bottom--none slds-theme--default">
                        <TabsPanel label={Label.Tab_Setup}>
                            <UserForm
                                user={userInfo}
                                onCreate={handleCreate}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        </TabsPanel>
                        {
                            !!userInfo &&
                            <TabsPanel label={Label.Tab_EncryptionKey}>
                                <ChangeEncryptionKeyPanel user={userInfo} onSave={handleUpdate}/>
                            </TabsPanel>
                        }
                        {
                            !!userInfo &&
                            <TabsPanel label={Label.Tab_ManageData} disabled={!userInfo}>
                                <DataManagementPanel user={userInfo}/>
                            </TabsPanel>
                        }
                        <TabsPanel label={Label.Tab_About}>
                            <About/>
                        </TabsPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Setup;