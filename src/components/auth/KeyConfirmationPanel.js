import React, {useState, useEffect} from "react";
import EditForm from "../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";
import Modal from "@salesforce/design-system-react/module/components/modal";

import IpcRenderController from "../../controllers/IpcRenderController";
import NavigationService from "../../modules/services/NavigationService";
import UserProxy from "../../modules/dao/proxies/user/UserProxy";
import useGlobal from "../../modules/globalState";

import {useHistory} from "react-router-dom";
import {Channels} from "../../constants";
import {Label} from "../../modules/translation/LabelService";
import {success, error} from "../../modules/util/toastify";

const KeyConfirmationPanel = () => {
    const [globalState, globalActions] = useGlobal(), {userInfo} = globalState;
    const history = useHistory();

    const [navService] = useState(NavigationService(history));
    const [userRecord, setUserRecord] = useState(userInfo);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const userProxy = new UserProxy(userRecord);
        Promise.resolve(userProxy)
            .then(userProxy => {
                if (!userProxy.encryptionKey) return Promise.reject(Label.EncryptionKey_ToConfirm);
                return IpcRenderController.performAction({channelName: Channels.VALIDATE_ACCOUNT, data: userRecord});
            })
            .then(() => success({title: Label.ToastSuccessTitle, message: Label.EncryptionKey_Confirmed}))
            .then(() => IpcRenderController.performAction({channelName: Channels.SAVE_ACCOUNT, data: userRecord}))
            .then(updatedUser => {
                // Pre-populate 'Encryption Key' info;
                let tempUserProxy = new UserProxy(updatedUser);
                tempUserProxy.encryptionKey = userProxy.encryptionKey;
                globalActions.setUserInfo(tempUserProxy.toRecord());
                // Navigate end user to vault;
                navService.toVault();
            })
            .catch(errorText => {
                if (userProxy.encryptionKey !== undefined) {
                    error({title: Label.ToastErrorTitle, message: errorText})
                }
            })
            .then(() => setLoading(false));
    }, [userRecord, globalActions, navService]);

    const handleSave = fields => {
        const record = new UserProxy(userRecord)
            .readFields(fields)
            .toRecord();
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
                    saveButtonLbl={Label.Btn_ValidateKey}
                    onSave={handleSave}
                    onCancel={navService.toDefault}
                />
            </section>
        </Modal>
    );
};

export default KeyConfirmationPanel;