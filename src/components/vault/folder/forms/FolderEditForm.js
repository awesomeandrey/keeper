import React, {useState, useEffect} from "react";
import EditForm from "../../../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import FolderProxy from "../../../../modules/dao/proxies/folder/FolderProxy";
import CustomEvents from "../../../../modules/util/CustomEvents";

import {Label} from "../../../../modules/translation/LabelService";
import {ApplicationEvents, Channels} from "../../../../constants";

const FolderEditForm = props => {
    const {user: userInfo, folder, onEdit, onCancel} = props;

    const [inputFields, setInputFields] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        IpcRenderController.performAction({channelName: Channels.SELECT_ALL_FOLDERS, data: userInfo})
            .then(allFolders => {
                const proxiedFolder = FolderProxy.init(folder);
                setInputFields(proxiedFolder.castToEditFields(allFolders));
            })
            .then(() => setLoading(false));
    }, [userInfo, folder]);

    const handleUpdate = fields => {
        setLoading(true);
        const updatedFolder = FolderProxy.init(folder).readFields(fields).castToRecord();
        IpcRenderController.performAction({channelName: Channels.SAVE_FOLDER, data: {userInfo, folder: updatedFolder}})
            .then(_ => onEdit(_))
            .catch(error => {
                CustomEvents.fire({
                    eventName: ApplicationEvents.SHOW_TOAST, detail: {
                        labels: {heading: Label.Form_Folder_EditError, details: error}, variant: "error"
                    }
                });
            })
            .then(() => setLoading(false));
    };

    return (
        <EditForm
            label={Label.Form_Folder_Edit}
            icon={<Icon category="utility" name="open_folder" size="small"/>}
            loading={loading}
            fields={inputFields}
            onSave={handleUpdate}
            onCancel={onCancel}
        />
    );
};

export default FolderEditForm;