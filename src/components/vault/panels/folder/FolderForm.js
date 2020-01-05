import React, {useState, useEffect} from "react";
import EditForm from "../../../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import FolderProxy from "../../../../modules/dao/proxies/folder/FolderProxy";
import CustomEvents from "../../../../modules/util/CustomEvents";

import {Label} from "../../../../modules/translation/LabelService";
import {ApplicationEvents, Channels, FormMode} from "../../../../constants";

const FolderForm = props => {
    const {
        user: userInfo,
        folder,
        parentFolder, // available in 'create' mode only
        mode = FormMode.CREATE_MODE, // default form mode;
        onCreate,
        onEdit,
        onCancel
    } = props;

    const [inputFields, setInputFields] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        IpcRenderController.performAction({channelName: Channels.SELECT_ALL_FOLDERS, data: userInfo})
            .then(allFolders => {
                const folderParser = FolderProxy.init(folder);
                let inputFields = mode === FormMode.CREATE_MODE
                    ? folderParser.castToCreateFields(allFolders, parentFolder)
                    : folderParser.castToEditFields(allFolders);
                setInputFields(inputFields);
            })
            .then(() => setLoading(false));
    }, [userInfo, folder, mode, parentFolder]);

    const performFolderSave = fields => {
        setLoading(true);
        const folderParser = FolderProxy.init(folder);
        return IpcRenderController.performAction({
            channelName: Channels.SAVE_FOLDER, data: {userInfo, folder: folderParser.castToRecord(fields)}
        });
    };

    const handleCreate = fields => {
        performFolderSave(fields)
            .then(createdFolder => onCreate(createdFolder))
            .catch(error => {
                CustomEvents.fire({
                    eventName: ApplicationEvents.SHOW_TOAST, detail: {
                        labels: {heading: Label.Form_Folder_CreateError, details: error}, variant: "error"
                    }
                });
            })
            .then(() => setLoading(false));
    };

    const handleUpdate = fields => {
        performFolderSave(fields)
            .then(updatedFolder => onEdit(updatedFolder))
            .catch(error => {
                CustomEvents.fire({
                    eventName: ApplicationEvents.SHOW_TOAST, detail: {
                        labels: {heading: Label.Form_Folder_EditError, details: error}, variant: "error"
                    }
                });
            })
            .then(() => setLoading(false));
    };

    if (mode === FormMode.CREATE_MODE) {
        return (
            <EditForm
                label={Label.Form_Folder_Create}
                icon={<Icon category="utility" name="open_folder" size="small"/>}
                hasCustomFields={false}
                loading={loading}
                fields={inputFields}
                onSave={handleCreate}
                onCancel={onCancel}
            />
        );
    } else {
        return (
            <EditForm
                label={Label.Form_Folder_Edit}
                icon={<Icon category="utility" name="open_folder" size="small"/>}
                hasCustomFields={false}
                loading={loading}
                fields={inputFields}
                onSave={handleUpdate}
                onCancel={onCancel}
            />
        );
    }
};

export default FolderForm;