/**
 * Intended for backend service usage (Electron main process).
 */
const {ipcMain} = require("electron");

const IpcMain = {};

const successResponse = data => ({success: true, data});

const failureResponse = error => ({success: false, error});

/**
 * Handles IPC actions.
 *
 * @param channelName - Valid IPC channel name;
 * @param callback - Callback function.
 */
IpcMain.subscribe = ({channelName, callback}) => {
    ipcMain.on(channelName, (event, arg) => {
        let result = {};
        if (typeof callback === "function") {
            try {
                result = callback(arg);
                result = successResponse(result);
            } catch (e) {
                console.log(`">>> Error occurred.\n\rChannel=${channelName}" | `, JSON.stringify(e));
                result = failureResponse(e.message);
            }
        }
        event.sender.send(channelName, result);
    });
};

module.exports = IpcMain;