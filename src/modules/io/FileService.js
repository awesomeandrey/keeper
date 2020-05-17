const {app} = require("electron");
const path = require("path");
const fs = require("fs");

const {FileNames} = require("../../constants");

const PATH_SEPARATOR = path.sep;
const CONFIG_FOLDER_PATH = (() => {
    if (!app) return ""; // Workaround for unit test;
    let isDev = process.env.NODE_ENV_IS_DEV,
        folderName = isDev ? FileNames.CONFIG_FOLDER_DEV : FileNames.CONFIG_FOLDER;
    return [app.getPath("appData"), folderName].join(PATH_SEPARATOR);
})();
const CONFIG_FILE_PATH = [CONFIG_FOLDER_PATH, FileNames.CONFIG_FILE].join(PATH_SEPARATOR);

const resolveConfigFolder = () => {
    if (!fileExists(CONFIG_FOLDER_PATH)) {
        fs.mkdirSync(CONFIG_FOLDER_PATH)
    }
    return CONFIG_FOLDER_PATH
};

const resolveConfigFile = () => {
    resolveConfigFolder();
    if (!fileExists(CONFIG_FILE_PATH)) {
        writeToFile(CONFIG_FILE_PATH, "{}");
    }
    return CONFIG_FILE_PATH;
};

const fileExists = filePath => {
    return fs.existsSync(filePath);
};

const eraseFile = filePath => {
    writeToFile(filePath, "");
};

const writeToFile = (filePath, content) => fs.writeFileSync(filePath, content);

const readFromFile = filePath => fs.readFileSync(filePath, "utf8");

const createDataFile = (userName, folderPath) => {
    const path = [folderPath, userName + "-" + FileNames.DATA_FILE].join(PATH_SEPARATOR);
    writeToFile(path, "");
    return path;
};

const createExportDataFile = (folderPath) => {
    const path = [folderPath, FileNames.DATA_EXPORT_FILE].join(PATH_SEPARATOR);
    writeToFile(path, "");
    return path;
};

const FileService = {
    resolveConfigFile,
    fileExists,
    eraseFile,
    writeToFile,
    readFromFile,
    createDataFile,
    createExportDataFile
};

module.exports = FileService;