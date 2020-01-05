const path = require("path");
const os = require("os");
const fs = require("fs");

const {FileNames} = require("../../constants");

const PATH_SEPARATOR = path.sep;
const CONFIG_FOLDER_PATH = os.homedir() + PATH_SEPARATOR + FileNames.CONFIG_FOLDER;
const CONFIG_FILE_PATH = CONFIG_FOLDER_PATH + PATH_SEPARATOR + FileNames.CONFIG_FILE;

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
    const path = folderPath + PATH_SEPARATOR + userName + "-" + FileNames.DATA_FILE;
    writeToFile(path, "");
    return path;
};

const createExportDataFile = (userName, folderPath) => {
    const path = folderPath + PATH_SEPARATOR + userName + "-" + FileNames.DATA_EXPORT_FILE;
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