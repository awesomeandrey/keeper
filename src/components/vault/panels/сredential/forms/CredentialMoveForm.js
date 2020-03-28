import React, {useState, useEffect} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import EditForm from "../../../../commons/forms/EditForm";

import IpcRenderController from "../../../../../controllers/IpcRenderController";
import CredentialProxy from "../../../../../modules/dao/proxies/credential/CredentialProxy";

import {Channels} from "../../../../../constants";
import {Label} from "../../../../../modules/translation/LabelService";

const CredentialMoveForm = props => {
    const {user: userInfo, credential, onMove, onCancel} = props;

    const [loading, setLoading] = useState(true);
    const [inputFields, setInputFields] = useState([]);

    useEffect(() => {
        const parser = CredentialProxy.init(credential);
        IpcRenderController.performAction({channelName: Channels.SELECT_ALL_FOLDERS, data: userInfo})
            .then(allFolders => {
                setInputFields(
                    parser.castToChangeFolderFields(allFolders)
                );
            })
            .then(() => setLoading(false));
    }, [userInfo, credential]);

    const handleMove = fields => {
        setLoading(true);
        const credentialToUpdate = CredentialProxy.init(credential)
            .extractFolder(fields)
            .castToRecord();
        IpcRenderController.performAction({
            channelName: Channels.SAVE_CREDENTIAL,
            data: {userInfo, credential: credentialToUpdate}
        })
            .then(() => onMove())
            .then(() => setLoading(false));
    };

    return (
        <EditForm
            label={Label.Form_Credential_Move}
            loading={loading}
            icon={<Icon category="utility" name="open_folder" size="small"/>}
            fields={inputFields}
            onSave={handleMove}
            onCancel={onCancel}
        />
    );
};

export default CredentialMoveForm;