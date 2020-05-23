import React, {useState, useEffect} from "react";
import EditForm from "../../../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import FolderProxy from "../../../../modules/dao/proxies/folder/FolderProxy";

import {Label} from "../../../../modules/translation/LabelService";
import {Channels} from "../../../../constants";
import {error} from "../../../../modules/util/toastify";

const FolderEditForm = props => {
    const {user: userInfo, folder, parentFolder, onCreate, onCancel} = props;

    const [inputFields, setInputFields] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        IpcRenderController.performAction({channelName: Channels.SELECT_ALL_FOLDERS, data: userInfo})
            .then(allFolders => {
                const folderProxy = new FolderProxy(folder);
                setInputFields(folderProxy.toCreateFields(allFolders, parentFolder));
            })
            .then(() => setLoading(false));
    }, [userInfo, folder, parentFolder]);

    const handleCreate = fields => {
        setLoading(true);
        const folderToCreate = new FolderProxy(folder).readFields(fields).toRecord();
        IpcRenderController.performAction({channelName: Channels.SAVE_FOLDER, data: {userInfo, folder: folderToCreate}})
            .then(_ => onCreate(_))
            .catch(errorText => error({title: Label.Form_Folder_CreateError, message: errorText}))
            .then(() => setLoading(false));
    };

    return (
        <EditForm
            label={Label.Form_Folder_Create}
            icon={<Icon category="utility" name="open_folder" size="small"/>}
            loading={loading}
            fields={inputFields}
            onSave={handleCreate}
            onCancel={onCancel}
        />
    );
};

export default FolderEditForm;