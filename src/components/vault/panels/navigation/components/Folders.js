import React from "react";
import Folder from "./Folder";

import FolderProxy from "../../../../../modules/dao/proxies/folder/FolderProxy";

const Folders = props => {
    const {folders = []} = props;
    return folders.map(_ => {
        let proxiedRecord = new FolderProxy(_);
        return <Folder
            key={proxiedRecord.recordId}
            {..._}
            proxiedFolder={proxiedRecord}
        />;
    });
};

export default Folders;