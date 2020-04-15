import IpcRender from "../modules/ipc/IpcRender";
import CustomEvents from "../modules/util/CustomEvents";
import {ApplicationEvents, Channels} from "../constants";

/**
 * Some IPC channels execution output may be intercepted
 * in order to perform side effects.
 *
 * @param channelName - Target channel name
 * @param data - Channel execution output
 */
const interceptChannelResponse = (channelName, data) => {
    if (channelName === Channels.SAVE_CREDENTIAL) {
        CustomEvents.fire({
            eventName: ApplicationEvents.UPDATE_CRED_PILLS,
            detail: {credential: data, updated: true}
        });
    } else if (channelName === Channels.DELETE_CREDENTIAL) {
        CustomEvents.fire({
            eventName: ApplicationEvents.UPDATE_CRED_PILLS,
            detail: {credential: data, deleted: true}
        });
    }
};

const performAction = ({channelName, data}) => {
    return new Promise((resolve, reject) => {
        IpcRender.subscribe({
            channelName, callback: ({success, data, error}) => {
                if (success) {
                    // Some channels are intercepted;
                    interceptChannelResponse(channelName, data);
                    resolve(data);
                } else {
                    reject(error);
                }
            }
        });
        IpcRender.send({channelName, data});
    });
};

const IpcRenderController = {
    performAction
};

export default IpcRenderController;