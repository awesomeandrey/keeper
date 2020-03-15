import React, {useState} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import EditForm from "../../../commons/forms/EditForm";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import UserProxy from "../../../../modules/dao/proxies/user/UserProxy";
import CustomEvents from "../../../../modules/util/CustomEvents";

import {ApplicationEvents, Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const Telegram2FAEditForm = props => {
    const {user, onSave, onCancel} = props;

    const [loading, setLoading] = useState(false);

    const handleSave = fields => {
        const proxiedUser = UserProxy.init(user).readFields(fields);
        if (proxiedUser.enableTelegram2FA && !proxiedUser.telegramBotApiToken) {
            CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.ToastWarningTitle, details: Label.Form_User_TelegramBot_TokenIsRequired},
                    variant: "warning"
                }
            });
            return;
        }
        setLoading(true);
        const updatedUser = proxiedUser.castToRecord();
        IpcRenderController.performAction({channelName: Channels.SAVE_ACCOUNT, data: updatedUser})
            .then(user => onSave(user))
            .catch(error => {
                setLoading(false);
                CustomEvents.fire({
                    eventName: ApplicationEvents.SHOW_TOAST, detail: {
                        labels: {heading: Label.ToastErrorTitle, details: error}, variant: "error"
                    }
                });
            });
    };

    const inputFields = UserProxy.init(user).castToFieldsForTelegramBotSetup();
    return (
        <EditForm
            label={Label.Form_User_TelegramBot_SetupTitle}
            icon={<Icon category="utility" name="send" size="small"/>}
            loading={loading}
            fields={inputFields}
            onSave={handleSave}
            onCancel={onCancel}
        />
    );
};

export default Telegram2FAEditForm;