import React, {useState} from "react";
import EditForm from "../../../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import CredentialProxy from "../../../../modules/dao/proxies/credential/CredentialProxy";
import CustomEvents from "../../../../modules/util/CustomEvents";
import RecordProxy from "../../../../modules/dao/proxies/common/RecordProxy";

import {error} from "../../../../modules/util/toastify";
import {ApplicationEvents, Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const CredentialCreateForm = props => {
    const {user, targetFolder, onCreate, onCancel} = props;
    let credentialProxy = new CredentialProxy();

    const [loading, setLoading] = useState(false);

    const handleSave = fields => {
        setLoading(true);
        credentialProxy = credentialProxy.readFields(fields);
        credentialProxy.folderId = new RecordProxy(targetFolder).recordId;
        IpcRenderController.performAction({
            channelName: Channels.SAVE_CREDENTIAL,
            data: {userInfo: user, credential: credentialProxy.toRecord()}
        })
            .then(credential => onCreate(credential))
            .then(() => CustomEvents.fire({eventName: ApplicationEvents.REFRESH_DATA}))
            .catch(errorText => error({title: Label.Form_Credential_CreateError, message: errorText}))
            .then(() => setLoading(false));
    };

    const inputFields = credentialProxy.toCreateFields();
    return (
        <EditForm
            label={Label.Form_Credential_Create}
            icon={<Icon category="utility" name="unlock" size="small"/>}
            hasCustomFields={false}
            loading={loading}
            fields={inputFields}
            onSave={handleSave}
            onCancel={onCancel}
        />
    );
};

export default CredentialCreateForm;