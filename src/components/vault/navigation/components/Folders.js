import React from "react";
import Folder from "./Folder";
import Droppable from "../../../commons/dnd/Droppable";

import FolderProxy from "../../../../modules/dao/proxies/folder/FolderProxy";
import CredentialProxy from "../../../../modules/dao/proxies/credential/CredentialProxy";
import itemTypes from "../../../commons/dnd/itemTypes";
import CustomEvents from "../../../../modules/util/CustomEvents";
import {ApplicationEvents} from "../../../../constants";

const Folders = props => {
    const {folders = []} = props;
    return folders.map(_ => {
        let folderProxy = new FolderProxy(_), handleDropItem = item => {
            let {type} = item;
            if (type === itemTypes.Credential) {
                let draggedCredentialProxy = new CredentialProxy(item);
                if (folderProxy.id === draggedCredentialProxy.folderId) return;
                draggedCredentialProxy.folderId = folderProxy.id;
                CustomEvents.fire({
                    eventName: ApplicationEvents.DROP_CREDENTIAL,
                    detail: draggedCredentialProxy.castToRecord()
                });
            }
        }
        return (
            <Droppable
                key={folderProxy.recordId}
                types={[itemTypes.Credential]}
                onDrop={handleDropItem}
            >
                <Folder {..._} folderProxy={folderProxy}/>
            </Droppable>
        );
    });
};

export default Folders;