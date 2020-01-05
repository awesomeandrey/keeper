import React, {useState, useEffect} from "react";
import WelcomeMat from "@salesforce/design-system-react/module/components/welcome-mat";
import Button from "@salesforce/design-system-react/module/components/button";
import DeleteAccounts from "./DeleteAccounts";
import SelectAccount from "./SelectAccount";
import {Spinner} from "@salesforce/design-system-react";

import IpcRenderController from "../../controllers/IpcRenderController";
import NavigationService from "../../modules/services/NavigationService";
import UserProxy from "../../modules/dao/proxies/user/UserProxy";
import useGlobal from "../../modules/globalState";

import {useHistory} from "react-router-dom";
import {Channels} from "../../constants";
import {Label, setLocale} from "../../modules/translation/LabelService";

const Welcome = () => {
    const history = useHistory(), navService = NavigationService(history);
    const [, globalActions] = useGlobal();

    const [proxiedUsers, setProxiedUsers] = useState([]);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleAddAccount = () => {
        globalActions.setUserInfo(null);
        navService.toSetup();
    };

    const handleDeleteAccounts = selectedProxiedUser => {
        setLoading(true);
        setDeleteMode(false);
        const promises = selectedProxiedUser.map(proxiedUser => {
            return IpcRenderController.performAction({channelName: Channels.DELETE_ACCOUNT, data: proxiedUser.record});
        });
        Promise.all(promises)
            .then(() => {
                let userIdsToExclude = selectedProxiedUser.map(_ => _.recordId);
                setProxiedUsers(
                    proxiedUsers.filter(({recordId}) => !userIdsToExclude.includes(recordId))
                );
                setLoading(false);
            });
    };

    const handleSelectAccount = proxiedUser => {
        globalActions.setUserInfo(proxiedUser.record);
        setLocale(proxiedUser.lang);
        navService.toVault();
    };

    useEffect(() => {
        globalActions.setUserInfo(null);
        IpcRenderController.performAction({channelName: Channels.LOAD_ACCOUNTS})
            .then(accounts => setProxiedUsers(accounts.map(_ => new UserProxy(_))))
            .then(() => setLoading(false));
    }, [globalActions]);

    if (loading) {
        return <Spinner variant="brand" size="medium"/>;
    } else {
        return (
            <WelcomeMat
                variant="info-only"
                labels={{
                    title: Label.Grl_AppName,
                    description: Label.Grl_AppDescription
                }}
                isOpen={true}
                onRequestClose={window.close}
                onRenderInfoActions={() => (
                    <div className="slds-is-relative">
                        <Button
                            variant="brand"
                            label={Label.Btn_AddAccount}
                            onClick={handleAddAccount}
                        />
                        <p className={proxiedUsers.length ? "slds-m-top--x-small" : "slds-hide"}>
                            <Button
                                variant="base"
                                label={Label.Grl_ManageAccounts}
                                onClick={() => setDeleteMode(true)}
                            />
                        </p>
                    </div>
                )}
            >
                {
                    isDeleteMode
                        ? <DeleteAccounts
                            proxiedUsers={proxiedUsers}
                            onCancel={() => setDeleteMode(false)}
                            onDelete={handleDeleteAccounts}/>
                        : <SelectAccount
                            proxiedUsers={proxiedUsers}
                            onSelect={handleSelectAccount}/>
                }
            </WelcomeMat>
        );
    }
};

export default Welcome;