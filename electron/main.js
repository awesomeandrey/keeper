const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const {app, BrowserWindow} = electron;

let mainWindow;

const createWindow = () => {
    let startUrl = isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../index.html")}`;
    mainWindow = new BrowserWindow({
        minWidth: 1100,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    });
    if (isDev) mainWindow.webContents.openDevTools();
    mainWindow.loadURL(startUrl);
    mainWindow.on("closed", () => mainWindow = null);
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

const IpcMainController = require("../src/controllers/IpcMainController");
IpcMainController.subscribeToChannels({...electron, mainWindow});