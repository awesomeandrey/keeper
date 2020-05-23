import React, {useState, useEffect} from "react";
import EditForm from "../../../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import FolderProxy from "../../../../modules/dao/proxies/folder/FolderProxy";

import {Label} from "../../../../modules/translation/LabelService";
import {Channels} from "../../../../constants";
import {error} from "../../../../modules/util/toastify";

const FolderEditForm = props => {
    const {user: userInfo, folder, onEdit, onCancel} = props;

    const [inputFields, setInputFields] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        IpcRenderController.performAction({channelName: Channels.SELECT_ALL_FOLDERS, data: userInfo})
            .then(allFolders => {
                const folderProxy = new FolderProxy(folder);
                setInputFields(folderProxy.toEditFields(allFolders));
            })
            .then(() => setLoading(false));
    }, [userInfo, folder]);

    const handleUpdate = fields => {
        setLoading(true);
        const updatedFolder = new FolderProxy(folder).readFields(fields).toRecord();
        IpcRenderController.performAction({channelName: Channels.SAVE_FOLDER, data: {userInfo, folder: updatedFolder}})
            .then(_ => onEdit(_))
            .catch(errorText => error({title: Label.Form_Folder_EditError, message: errorText}))
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