import React, {useState} from "react";
import EditForm from "../../../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import CredentialProxy from "../../../../modules/dao/proxies/credential/CredentialProxy";
import CustomEvents from "../../../../modules/util/CustomEvents";

import {error} from "../../../../modules/util/toastify";
import {ApplicationEvents, Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const CredentialEditForm = props => {
    const {user, credential, onEdit, onCancel} = props, proxiedCredential = new CredentialProxy(credential);

    const [loading, setLoading] = useState(false);

    const handleSave = fields => {
        setLoading(true);
        const credential = proxiedCredential.toRecord(fields);
        IpcRenderController.performAction({channelName: Channels.SAVE_CREDENTIAL, data: {userInfo: user, credential}})
            .then(credential => onEdit(credential))
            .then(() => CustomEvents.fire({eventName: ApplicationEvents.REFRESH_DATA}))
            .catch(errorText => error({title: Label.Form_Credential_EditError, message: errorText}))
            .then(() => setLoading(false));
    };

    const inputFields = proxiedCredential.toEditFields();
    return (
        <EditForm
            label={Label.Form_Credential_Edit}
            loading={loading}
            hasCustomFields={true}
            icon={<Icon category="utility" name="unlock" size="small"/>}
            fields={inputFields}
            onSave={handleSave}
            onCancel={onCancel}
        />
    );
};

export default CredentialEditForm;