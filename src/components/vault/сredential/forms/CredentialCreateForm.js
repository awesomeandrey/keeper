import React, {useState} from "react";
import EditForm from "../../../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import CredentialProxy from "../../../../modules/dao/proxies/credential/CredentialProxy";
import CustomEvents from "../../../../modules/util/CustomEvents";

import {ApplicationEvents, Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const CredentialCreateForm = props => {
    const {user, targetFolder, onCreate, onCancel} = props, parser = new CredentialProxy();

    const [loading, setLoading] = useState(false);

    const handleSave = fields => {
        setLoading(true);
        const credential = parser.castToRecord(fields);
        parser.relateToFolder(credential, targetFolder);
        IpcRenderController.performAction({channelName: Channels.SAVE_CREDENTIAL, data: {userInfo: user, credential}})
            .then(credential => onCreate(credential))
            .then(() => CustomEvents.fire({eventName: ApplicationEvents.REFRESH_DATA}))
            .catch(error => {
                CustomEvents.fire({
                    eventName: ApplicationEvents.SHOW_TOAST, detail: {
                        labels: {heading: Label.Form_Credential_CreateError, details: error}, variant: "error"
                    }
                });
            })
            .then(() => setLoading(false));
    };

    const inputFields = parser.castToCreateFields();
    return (
        <EditForm
            label={Label.Form_Credential_Create}
            icon={<Icon category="utility" name="unlock" size="small"/>}
            hasCustomFields={true}
            loading={loading}
            fields={inputFields}
            onSave={handleSave}
            onCancel={onCancel}
        />
    );
};

export default CredentialCreateForm;