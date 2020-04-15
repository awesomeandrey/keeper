import React, {useState, useEffect, useCallback} from "react";
import FolderEditForm from "./forms/FolderEditForm";
import FolderCreateForm from "./forms/FolderCreateForm";
import FolderDeleteButton from "./forms/FolderDeleteButton";

import CustomEvents from "../../../modules/util/CustomEvents";

import {ApplicationEvents} from "../../../constants";
import {Label} from "../../../modules/translation/LabelService";

const closeModal = () => CustomEvents.fire({eventName: ApplicationEvents.CLOSE_MODAL});

const refresh = () => CustomEvents.fire({eventName: ApplicationEvents.REFRESH_DATA});

const FolderActionProvider = props => {
    const {user} = props;

    const [selectedFolder, selectFolder] = useState(null);

    const handleCreateFolder = useCallback(() => {
        CustomEvents.fire({
            eventName: ApplicationEvents.OPEN_MODAL,
            detail: {
                content: (
                    <FolderCreateForm
                        user={user}
                        parentFolder={selectedFolder}
                        onCreate={() => {
                            refresh();
                            closeModal();
                        }}
                        onCancel={closeModal}
                    />
                )
            }
        });
    }, [user, selectedFolder]);

    const handleEditFolder = useCallback(folderToEdit => {
        CustomEvents.fire({
            eventName: ApplicationEvents.OPEN_MODAL,
            detail: {
                content: (
                    <FolderEditForm
                        user={user}
                        folder={folderToEdit}
                        onEdit={() => {
                            refresh();
                            closeModal();
                        }}
                        onCancel={closeModal}
                    />
                )
            }
        });
    }, [user]);

    const handleDeleteFolder = useCallback(folderToDelete => {
        CustomEvents.fire({
            eventName: ApplicationEvents.OPEN_MODAL,
            detail: {
                heading: Label.Form_Grl_ConfirmationTitle,
                content: Label.Form_Folder_DeleteConfirmation,
                footer: (
                    <FolderDeleteButton
                        user={user}
                        folder={folderToDelete}
                        onDelete={() => {
                            refresh();
                            closeModal();
                        }}
                    />
                )
            }
        });
    }, [user]);

    useEffect(() => {
        CustomEvents.register({
            eventName: ApplicationEvents.SELECT_FOLDER,
            callback: ({detail}) => selectFolder(detail)
        });
        CustomEvents.register({
            eventName: ApplicationEvents.CREATE_FOLDER,
            callback: handleCreateFolder
        });
        CustomEvents.register({
            eventName: ApplicationEvents.EDIT_FOLDER,
            callback: ({detail: folder}) => handleEditFolder(folder)
        });
        CustomEvents.register({
            eventName: ApplicationEvents.DELETE_FOLDER,
            callback: ({detail: folder}) => handleDeleteFolder(folder)
        });
    }, [user, handleCreateFolder, handleEditFolder, handleDeleteFolder]);

    // UI-less component;
    return <span/>;
};

export default FolderActionProvider;