import React, {useState, useEffect} from "react";
import EditForm from "../../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";
import Modal from "@salesforce/design-system-react/module/components/modal";

import IpcRenderController from "../../../controllers/IpcRenderController";
import NavigationService from "../../../modules/services/NavigationService";
import UserProxy from "../../../modules/dao/proxies/user/UserProxy";
import CustomEvents from "../../../modules/util/CustomEvents";

import {useHistory} from "react-router-dom";
import {Channels, ApplicationEvents} from "../../../constants";
import {Label} from "../../../modules/translation/LabelService";

const KeyConfirmationPanel = props => {
    const {user, onConfirm} = props;
    const history = useHistory(), navService = new NavigationService(history);

    const [proxiedUser, setProxiedUser] = useState(UserProxy.init(user));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (proxiedUser) {
            setLoading(true);
            Promise.resolve(proxiedUser)
                .then(proxiedUser => {
                    if (proxiedUser.encryptionKey) {
                        return Promise.resolve(proxiedUser.record);
                    }
                    return Promise.reject(Label.EncryptionKey_ToConfirm);
                })
                .then(_ => IpcRenderController.performAction({
                    channelName: Channels.VALIDATE_ACCOUNT, data: _
                }))
                .then(() => IpcRenderController.performAction({
                    channelName: Channels.SAVE_ACCOUNT, data: proxiedUser.record
                }))
                .then(updatedUser => {
                    // Update 'Last Modified Date';
                    proxiedUser.lastModifiedDate = UserProxy.init(updatedUser).lastModifiedDate;
                    onConfirm(proxiedUser.record);
                })
                .then(() => {
                    CustomEvents.fire({
                        eventName: ApplicationEvents.SHOW_TOAST, detail: {
                            labels: {heading: Label.ToastSuccessTitle, details: Label.EncryptionKey_Confirmed},
                            variant: "success"
                        }
                    });
                })
                .catch(error => {
                    setLoading(false);
                    CustomEvents.fire({
                        eventName: ApplicationEvents.SHOW_TOAST, detail: {
                            labels: {heading: Label.ToastErrorTitle, details: error}, variant: "error"
                        }
                    });
                })
        } else {
            setLoading(false);
        }
    }, [proxiedUser, onConfirm]);

    const handleSave = inputFields => {
        proxiedUser.readFields(inputFields);
        setProxiedUser(
            UserProxy.init(proxiedUser.record)
        );
    };

    const inputFields = proxiedUser.castToFieldsForKeyConfirmation();
    return (
        <Modal size="small" isOpen disableClose>
            <section>
                <EditForm
                    label={Label.EncryptionKey_ToProvide}
                    icon={<Icon category="utility" name="yubi_key" size="small"/>}
                    hasCustomFields={false}
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