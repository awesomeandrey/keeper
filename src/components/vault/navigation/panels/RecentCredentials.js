import React, {useEffect} from "react";
import Button from "@salesforce/design-system-react/module/components/button";
import Tooltip from "@salesforce/design-system-react/module/components/tooltip";

import CredentialProxy from "../../../../modules/dao/proxies/credential/CredentialProxy";
import useGlobal from "../../../../modules/globalState";
import CustomEvents from "../../../../modules/util/CustomEvents";
import {Label} from "../../../../modules/translation/LabelService";
import {ApplicationEvents} from "../../../../constants";

const MAX_ITEMS_AMOUNT = 3;

const RecentCredentials = () => {
    const [globalState, globalActions] = useGlobal(), {recentCredentials = []} = globalState;

    useEffect(() => {
        const handleSelectCredential = ({detail: selectedCredential}) => {
            if (selectedCredential) {
                let tempArray = [...recentCredentials], itemsMap = new Map();
                tempArray.unshift(selectedCredential);
                tempArray.forEach(credential => {
                    let credentialProxy = new CredentialProxy(credential);
                    if (!itemsMap.has(credentialProxy.id)) {
                        itemsMap.set(credentialProxy.id, credentialProxy.castToRecord());
                    }
                });
                tempArray = [...itemsMap.values()];
                if (tempArray.length > MAX_ITEMS_AMOUNT) {
                    tempArray = tempArray.slice(0, MAX_ITEMS_AMOUNT);
                }
                globalActions.setRecentCredentials(tempArray);
            }
        };
        CustomEvents.register({eventName: ApplicationEvents.SELECT_CRED_ITEM, callback: handleSelectCredential});
        const handleUpdateCredentialPills = event => {
            const {credential, updated = false, deleted = false} = event.detail;
            if (updated) {
                handleSelectCredential({detail: credential});
            } else if (deleted) {
                let credentialProxyToDelete = new CredentialProxy(credential);
                globalActions.setRecentCredentials(
                    recentCredentials.filter(credential => {
                        let credentialProxy = new CredentialProxy(credential);
                        return credentialProxy !== credentialProxyToDelete.id;
                    })
                );
            }
        };
        CustomEvents.register({eventName: ApplicationEvents.UPDATE_CRED_PILLS, callback: handleUpdateCredentialPills});
        return () => {
            CustomEvents.unregister({
                eventName: ApplicationEvents.SELECT_CRED_ITEM,
                callback: handleSelectCredential
            });
            CustomEvents.unregister({
                eventName: ApplicationEvents.UPDATE_CRED_PILLS,
                callback: handleUpdateCredentialPills
            });
        };
    }, [globalActions, recentCredentials]);

    const handleClickPill = (event, credential) => {
        event.preventDefault();
        CustomEvents.fire({eventName: ApplicationEvents.SELECT_CRED_ITEM, detail: credential});
    }

    const handleRemovePill = credential => {
        let credentialProxy = new CredentialProxy(credential);
        globalActions.setRecentCredentials(
            recentCredentials.filter(credential => {
                let tempCredentialProxy = new CredentialProxy(credential);
                return tempCredentialProxy.id !== credentialProxy.id;
            })
        );
    }

    const pillElements = recentCredentials.map(_ => {
        let credentialProxy = new CredentialProxy(_);
        return (
            <span className="slds-pill slds-pill_link">
                <a href="/" className="slds-pill__action" onClick={event => handleClickPill(event, _)}>
                    <span className="slds-pill__label">{credentialProxy.name}</span>
                </a>
                <Button
                    className="slds-pill__remove"
                    iconCategory="utility"
                    iconName="close"
                    iconSize="small"
                    variant="icon"
                    onClick={() => handleRemovePill(_)}
                />
            </span>
        );
    });

    if (pillElements.length) {
        return (
            <div className="slds-pill_container slds-border__none">
                <span className="slds-p-around--xxx-small">
                    <Tooltip
                        align="top left"
                        content={Label.DnD_RecentCredentials}
                        variant="learnMore"
                        dialogClassName="dialog-classname"
                    />
                </span>
                {pillElements}
            </div>
        );
    }

    return null;
};

export default RecentCredentials;