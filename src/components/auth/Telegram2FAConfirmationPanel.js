import React, {useState, useEffect, useCallback} from "react";
import Modal from "@salesforce/design-system-react/module/components/modal";
import Button from "@salesforce/design-system-react/module/components/button";
import {Spinner} from "@salesforce/design-system-react";

import IpcRenderController from "../../controllers/IpcRenderController";
import TelegramService from "../../modules/integration/telegram/TelegramService";
import NavigationService from "../../modules/services/NavigationService";
import UserProxy from "../../modules/dao/proxies/user/UserProxy";
import CustomEvents from "../../modules/util/CustomEvents";
import useGlobal from "../../modules/globalState";

import {ApplicationEvents, Channels} from "../../constants";
import {useHistory} from "react-router-dom";
import {Label} from "../../modules/translation/LabelService";

const CONFIRMATION_COMMAND = "/confirm";

const Telegram2FAConfirmationPanel = () => {
    const [globalState] = useGlobal(), {userInfo} = globalState, history = useHistory();

    const [telegramService, initTelegramService] = useState(null);
    const [navService] = useState(NavigationService(history));
    const [loading, setLoading] = useState(false);

    const sendConfirmationMessage = useCallback(() => {
        setLoading(true);
        telegramService.notifyAboutLoginAttempt(CONFIRMATION_COMMAND)
            .then(() => CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.ToastSuccessTitle, details: Label.Telegram2FA_MessageSent}, variant: "success"
                }
            }))
            .then(() => setLoading(false));
    }, [telegramService]);

    useEffect(() => {
        if (telegramService !== null) {
            // Register listener for new messages;
            telegramService.onNewMessage(message => {
                if (message === CONFIRMATION_COMMAND) {
                    setLoading(true);
                    initTelegramService(null);
                    telegramService.resetMessageListener();
                    telegramService.notifyAboutSuccessfulLogin()
                        .then(() => navService.toKeyConfirmation());
                }
            });

            // Send confirmation message;
            sendConfirmationMessage();
        }
        return () => {
            if (telegramService !== null) telegramService.disconnect();
        }
    }, [telegramService, navService, sendConfirmationMessage]);

    useEffect(() => {
        // Initialize service upon component load;
        setLoading(true);
        const proxiedUser = new UserProxy(userInfo);
        TelegramService.connect(proxiedUser.telegramBotApiToken, proxiedUser.telegramBotChatId)
            .then(instance => {
                if (instance.chatId) {
                    initTelegramService(instance);
                    // Store Telegram Bot 'chatId';
                    proxiedUser.telegramBotChatId = instance.chatId;
                    return IpcRenderController.performAction({
                        channelName: Channels.SAVE_ACCOUNT, data: proxiedUser.record
                    });
                } else {
                    return Promise.reject(Label.Telegram2FA_BotIsIdle);
                }
            })
            .catch(error => CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.ToastErrorTitle, details: error.message}, variant: "error"
                }
            }))
            .then(() => setLoading(false));
    }, [userInfo]);

    return (
        <Modal
            isOpen
            disableClose
            prompt="warning"
            size="medium"
            title={Label.Telegram2FA_ConfirmActionTitle}
            footer={[
                <Button
                    variant="brand"
                    disabled={telegramService === null}
                    label={Label.Telegram2FA_ReSend}
                    onClick={sendConfirmationMessage}
                />,
                <Button
                    variant="neutral"
                    label={Label.Btn_Back}
                    onClick={navService.toDefault}
                />
            ]}
        >
            <div className="slds-is-relative slds-m-around_medium">
                {loading && <Spinner variant="brand"/>}
                <p className="slds-align_absolute-center">
                    {Label.Telegram2FA_ConfirmActionDescription}
                </p>
            </div>
        </Modal>
    );
};

export default Telegram2FAConfirmationPanel;