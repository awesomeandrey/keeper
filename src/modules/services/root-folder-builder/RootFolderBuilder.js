const assignCredentialsToFolders = (folders, credentials) => {
    let remainingCredentials = credentials;
    return folders.map(folder => {
        let filteredCredentials = remainingCredentials.filter(_ => _.folderId === folder.id);
        remainingCredentials = remainingCredentials.filter(_ => _.folderId !== folder.id);
        return {...folder, credentials: filteredCredentials};
    });
};

const buildFolderDefinitions = allFolders => {
    return allFolders
        .filter(f => !f.parentId)
        .map(topLevelFolder => buildFolderDefinition(topLevelFolder, allFolders));
};

const buildFolderDefinition = (topFolder = {}, allFolders = []) => {
    topFolder.folders = [];
    let childFolders = allFolders.filter(f => topFolder.id === f.parentId),
        remainingFolders = allFolders.filter(f => topFolder.id !== f.parentId);
    childFolders.forEach(childFolder => {
        let filledFolder = buildFolderDefinition(childFolder, remainingFolders);
        topFolder.folders.push(filledFolder);
    });
    return topFolder;
};

class RootFolderBuilder {
    static build({folders, credentials}) {
        let filledFolders = assignCredentialsToFolders(folders, credentials);
        return {
            folders: buildFolderDefinitions(filledFolders),
            credentialsWithoutParentFolder: credentials.filter(_ => !_.folderId), // credentials without parent folder;
            allCredentials: credentials // all credentials;
        };
    }
}

module.exports = RootFolderBuilder;