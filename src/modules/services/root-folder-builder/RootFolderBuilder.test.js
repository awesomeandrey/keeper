const RootFolderBuilder = require("./RootFolderBuilder");

/**
 * Expectations:
 *
 * 2 parent folders;
 * 2 credentials without folder reference;
 */

const testFolders = [
    {
        id: "f1",
        folderName: "F1"
    },
    {
        id: "f2",
        folderName: "F2"
    },
    {
        id: "f3",
        parentId: "f2",
        folderName: "F3"
    },
    {
        id: "f4",
        parentId: "f2",
        folderName: "F4"
    },
    {
        id: "f5",
        parentId: "f3",
        folderName: "F5"
    },
    {
        id: "f6",
        parentId: "f3",
        folderName: "F6"
    }
];

const testCredentials = [
    {
        id: "c1",
        name: "Cred without folder reference (#1)"
    },
    {
        id: "c2",
        name: "Cred without folder reference (#2)"
    },
    {
        id: "c3",
        folderId: "f6",
        name: "Cred Item sitting is folder."
    },
    {
        id: "c4",
        folderId: "f6",
        name: "Cred Item sitting is folder."
    }
];

describe("RootFolderBuilder", () => {
    test("Build 'rootFolder' definition", () => {
        const rootFolder = RootFolderBuilder.build({folders: testFolders, credentials: testCredentials});
        const {folders, credentialsWithoutParentFolder} = rootFolder;
        expect(folders.length).toBe(2);
        expect(credentialsWithoutParentFolder.length).toBe(2);
        const targetFolderCredentials = folders.find(_ => _.id === "f2")
            .folders.find(_ => _.id === "f3")
            .folders.find(_ => _.id === "f6")
            .credentials;
        expect(targetFolderCredentials.length).toBe(2);
    });
});