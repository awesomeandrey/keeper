import {TelegramClient} from "messaging-api-telegram";

class TelegramService {
    constructor(token, chatId) {
        this.client = new TelegramClient(token);
        this.chatId = chatId;
        this.lastUpdateId = 0;
        this.messageHandler = null;
    }

    static connect(token, chatId) {
        const instance = new this(token, chatId);
        return new Promise(resolve => {
            instance.client.getUpdates({limit: 1, offset: -200})
                .then(updates => {
                    if (updates.length) {
                        let [firstItem] = updates, {update_id, message} = firstItem, {chat} = message;
                        instance.chatId = chat.id;
                        instance.lastUpdateId = update_id;
                    }
                    resolve(instance);
                });
        });
    }

    static validate(token) {
        const instance = new this(token);
        return instance.client.getMe().catch(({message}) => Promise.reject(message));
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
}

export default TelegramService;