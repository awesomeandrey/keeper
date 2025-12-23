/**
 * Intended for frontend service usage (React input).
 */
const {ipcRenderer} = window;

const IpcRender = {};

IpcRender.send = ({channelName, data}) => {
    if (ipcRenderer) {
        const clonableDataState = JSON.parse(JSON.stringify(data || {}));
        ipcRenderer.send(channelName, clonableDataState);
    } else {
        console.error(">>> 'ipcRenderer' was not found.")
    }
};

IpcRender.subscribe = ({channelName, callback}) => {
    if (ipcRenderer) {
        ipcRenderer.on(channelName, (event, arg) => {
            ipcRenderer.removeAllListeners(channelName);
            if (typeof callback === "function") callback(arg);
        });
    } else {
        console.error(">>> 'ipcRenderer' was not found.")
    }
};

export default IpcRender;