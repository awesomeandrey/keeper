import React, {useState} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import EditForm from "../../../commons/forms/EditForm";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import CustomEvents from "../../../../modules/util/CustomEvents";
import UserProxy from "../../../../modules/dao/proxies/user/UserProxy";

import {ApplicationEvents, Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const UserCreateForm = props => {
    const {onCreate, onCancel} = props, userParser = new UserProxy();

    const [loading, setLoading] = useState(false);

    const handleSave = fields => {
        setLoading(true);
        const userInfo = userParser.castToRecord(fields);
        IpcRenderController.performAction({channelName: Channels.CREATE_ACCOUNT, data: userInfo})
            .then(user => onCreate(user))
            .catch(error => {
                CustomEvents.fire({
                    eventName: ApplicationEvents.SHOW_TOAST, detail: {
                        labels: {heading: Label.Form_User_CreateError, details: error}, variant: "error"
                    }
                });
            })
            .then(() => setLoading(false));
    };

    const inputFields = userParser.castToCreateFields();
    return (
        <EditForm
            label={Label.Form_User_Create}
            icon={<Icon category="standard" name="service_resource" size="medium"/>}
            loading={loading}
            fields={inputFields}
            onSave={handleSave}
            onCancel={onCancel}
        />
    );
};

export default UserCreateForm;