import React from "react";
import Folders from "../../components/Folders";
import Credentials from "../../components/Credentials";
import EmptyArea from "../../../../commons/EmptyArea";
import Droppable from "../../../../commons/dnd/Droppable";

import CredentialProxy from "../../../../../modules/dao/proxies/credential/CredentialProxy";
import CustomEvents from "../../../../../modules/util/CustomEvents";
import itemTypes from "../../../../commons/dnd/itemTypes";
import {Label} from "../../../../../modules/translation/LabelService";
import {ApplicationEvents} from "../../../../../constants";

const FolderView = ({folders = [], credentialsWithoutParentFolder = []}) => {
    if (!folders.length && !credentialsWithoutParentFolder.length) {
        return <EmptyArea label={Label.Grl_EmptySet} iconName="all"/>;
    }

    const handleDropItem = item => {
        let {type} = item;
        if (type === itemTypes.Credential) {
            let draggedCredentialProxy = new CredentialProxy(item);
            if (!draggedCredentialProxy.folderId) return;
            draggedCredentialProxy.folderId = ""; // Move credential to 'root' folder;
            CustomEvents.fire({
                eventName: ApplicationEvents.DROP_CREDENTIAL,
                detail: draggedCredentialProxy.toRecord()
            });
        }
    };

    return (
        <Droppable
            types={[itemTypes.Credential]}
            dropZoneLabel={Label.DnD_MoveToRootFolder}
            isOverClassName="slds-p-vertical--medium"
            onDrop={handleDropItem}
        >
            <Folders folders={folders}/>
            <Credentials credentials={credentialsWithoutParentFolder} draggable/>
        </Droppable>
    );
};

export default FolderView;