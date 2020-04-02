import DeviceDetector from "device-detector-js";
import Util from "../../util/Util";

import {TelegramClient} from "messaging-api-telegram";
import {Label} from "../../translation/LabelService";

class TelegramService {
    constructor(token, chatId) {
        this.client = new TelegramClient(token);
        this.chatId = chatId;
        this.lastUpdateId = 0;
        this.messageHandler = null;
    }

    static connect(token, chatId) {
        const instance = new this(token, chatId);
        return new Promise((resolve, reject) => {
            instance.client.getUpdates({limit: 1, offset: -200})
                .then(updates => {
                    if (updates.length) {
                        let [firstItem] = updates, {update_id, message} = firstItem, {chat} = message;
                        instance.chatId = chat.id;
                        instance.lastUpdateId = update_id;
                    }
                    resolve(instance);
                })
                .catch(error => reject(error));
        });
    }

    static validate(token) {
        const instance = new this(token);
        return instance.client.getMe().catch(({message}) => Promise.reject(message));
    }

    notifyAboutLoginAttempt(command) {
        const CONFIRMATION_MESSAGE = `${Label.Telegram2FA_ConfirmLogin} \u{27A1} ${command} (${this.getMachineInfo()})`;
        return this.sendMessage(CONFIRMATION_MESSAGE);
    }

    notifyAboutSuccessfulLogin() {
        let message = `${Label.Telegram2FA_SuccessfulLogin} \u{2705} (${Util.formatTimeStamp()}).`;
        return this.sendMessage(message);
    }

    sendMessage(messageToSend) {
        return this.client.sendMessage(this.chatId, messageToSend);
    }

    onNewMessage(callback) {
        this.messageHandler = setInterval(() => {
            this.client.getUpdates({limit: 1, offset: this.lastUpdateId + 1})
                .then(updates => {
                    if (updates.length) {
                        const [firstUpdate] = updates, {message, update_id} = firstUpdate;
                        this.lastUpdateId = update_id;
                        callback(message.text);
                    }
                });
        }, 3500);
    }

    resetMessageListener() {
        clearInterval(this.messageHandler);
    }

    disconnect() {
        this.resetMessageListener();
        this.client = this.chatId = this.lastUpdateId = this.messageHandler = null;
    }

    getMachineInfo() {
        let deviceDetector = new DeviceDetector(), {client, os} = deviceDetector.parse(window.clientInformation.userAgent);
        return `${client.name} ${client.version}, ${os.name} ${os.platform}`;
    }
}

export default TelegramService;