/**
 * Intended for frontend service usage (React input).
 */
const {ipcRenderer} = window;

const IpcRender = {};

IpcRender.send = ({channelName, data}) => {
    if (ipcRenderer) {
        ipcRenderer.send(channelName, data);
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