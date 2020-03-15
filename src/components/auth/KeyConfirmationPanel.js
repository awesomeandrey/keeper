import React, {useState, useEffect} from "react";
import EditForm from "../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";
import Modal from "@salesforce/design-system-react/module/components/modal";

import IpcRenderController from "../../controllers/IpcRenderController";
import NavigationService from "../../modules/services/NavigationService";
import UserProxy from "../../modules/dao/proxies/user/UserProxy";
import CustomEvents from "../../modules/util/CustomEvents";
import useGlobal from "../../modules/globalState";

import {useHistory} from "react-router-dom";
import {Channels, ApplicationEvents} from "../../constants";
import {Label} from "../../modules/translation/LabelService";

const KeyConfirmationPanel = () => {
    const [globalState, globalActions] = useGlobal(), {userInfo} = globalState;
    const history = useHistory();

    const [navService] = useState(NavigationService(history));
    const [userRecord, setUserRecord] = useState(userInfo);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const proxiedUser = new UserProxy(userRecord);
        Promise.resolve(proxiedUser)
            .then(proxiedUser => {
                if (!proxiedUser.encryptionKey) return Promise.reject(Label.EncryptionKey_ToConfirm);
                return IpcRenderController.performAction({channelName: Channels.VALIDATE_ACCOUNT, data: userRecord});
            })
            .then(() => CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.ToastSuccessTitle, details: Label.EncryptionKey_Confirmed},
                    variant: "success"
                }
            }))
            .then(() => IpcRenderController.performAction({channelName: Channels.SAVE_ACCOUNT, data: userRecord}))
            .then(updatedUser => {
                // Pre-populate 'Encryption Key' info;
                let tempProxiedUser = new UserProxy(updatedUser);
                tempProxiedUser.encryptionKey = proxiedUser.encryptionKey;
                globalActions.setUserInfo(tempProxiedUser.castToRecord());
                // Navigate end user to vault;
                navService.toVault();
            })
            .catch(error => {
                setLoading(false);
                CustomEvents.fire({
                    eventName: ApplicationEvents.SHOW_TOAST, detail: {
                        labels: {heading: Label.ToastErrorTitle, details: error}, variant: "error"
                    }
                });
            });
    }, [userRecord, globalActions, navService]);

    const handleSave = fields => {
        const record = new UserProxy(userRecord).readFields(fields).castToRecord();
        setUserRecord(record);
    };

    const inputFields = new UserProxy(userRecord).castToFieldsForKeyConfirmation();
    return (
        <Modal size="small" isOpen disableClose>
            <section>
                <EditForm
                    label={Label.EncryptionKey_ToProvide}
                    icon={<Icon category="utility" name="yubi_key" size="small"/>}
                    loading={loading}
                    fields={inputFields}
                    onSave={handleSave}
                    onCancel={navService.toDefault}
                />
            </section>
        </Modal>
    );
};

export default KeyConfirmationPanel;