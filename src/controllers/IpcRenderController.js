import IpcRender from "../modules/ipc/IpcRender";

const performAction = ({channelName, data}) => {
    return new Promise((resolve, reject) => {
        IpcRender.subscribe({
            channelName, callback: ({success, data, error}) => {
                if (success) {
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