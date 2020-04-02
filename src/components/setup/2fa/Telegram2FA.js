import React, {useState} from "react";
import Telegram2FAViewForm from "./forms/Telegram2FAViewForm";
import Telegram2FAEditForm from "./forms/Telegram2FAEditForm";

import IpcRenderController from "../../../controllers/IpcRenderController";
import TelegramService from "../../../modules/integration/telegram/TelegramService";
import UserProxy from "../../../modules/dao/proxies/user/UserProxy";
import CustomEvents from "../../../modules/util/CustomEvents";

import {ApplicationEvents, Channels, FormMode} from "../../../constants";
import {Label} from "../../../modules/translation/LabelService";

const validateToken = token => {
    return TelegramService.validate(token)
        .then(() => CustomEvents.fire({
            eventName: ApplicationEvents.SHOW_TOAST, detail: {
                labels: {heading: Label.ToastSuccessTitle, details: Label.Form_User_TelegramBot_SetupSuccess},
                variant: "success"
            }
        }))
        .catch(message => {
            CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.Form_User_TelegramBot_SetupError, details: message},
                    variant: "error"
                }
            });
            return Promise.reject(message);
        });
};

const Telegram2FA = props => {
    const {user, onSave} = props;

    const [mode, setMode] = useState(FormMode.VIEW_MODE);
    const [loading, setLoading] = useState(false);

    const handleSave = updatedUser => {
        setMode(FormMode.VIEW_MODE);
        setLoading(true);
        const proxiedUser = new UserProxy(updatedUser);
        if (proxiedUser.enableTelegram2FA) {
            validateToken(proxiedUser.telegramBotApiToken)
                .then(() => onSave(proxiedUser.record), error => {
                    console.error("Telegram 2FA", error);
                    // Rollback changes;
                    proxiedUser.enableTelegram2FA = false;
                    proxiedUser.telegramBotChatId = undefined;
                    proxiedUser.telegramBotApiToken = undefined;
                    return IpcRenderController.performAction({
                        channelName: Channels.SAVE_ACCOUNT, data: proxiedUser.record
                    });
                })
                .catch(error => {
                    CustomEvents.fire({
                        eventName: ApplicationEvents.SHOW_TOAST, detail: {
                            labels: {heading: Label.ToastErrorTitle, details: error}, variant: "error"
                        }
                    });
                })
                .then(() => setLoading(false));
        } else {
            onSave(proxiedUser.record);
            setLoading(false);
        }
    };

    const validate = () => {
        setLoading(true);
        const proxiedUser = new UserProxy(user);
        validateToken(proxiedUser.telegramBotApiToken)
            .catch(error => console.error("Telegram 2FA", error))
            .then(() => setLoading(false));
    };

    if (mode === FormMode.EDIT_MODE) {
        return (
            <Telegram2FAEditForm
                user={user}
                onSave={handleSave}
                onCancel={() => setMode(FormMode.VIEW_MODE)}
            />
        );
    } else {
        return (
            <Telegram2FAViewForm
                user={user}
                loading={loading}
                onValidateConnection={validate}
                onEdit={() => setMode(FormMode.EDIT_MODE)}
            />
        );
    }
};

export default Telegram2FA;