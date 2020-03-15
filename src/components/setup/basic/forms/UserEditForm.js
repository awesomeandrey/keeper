import React, {useState} from "react";
import EditForm from "../../../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import UserProxy from "../../../../modules/dao/proxies/user/UserProxy";
import CustomEvents from "../../../../modules/util/CustomEvents";

import {ApplicationEvents, Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const UserEditForm = props => {
    const {user, onEdit, onCancel} = props, userParser = new UserProxy(user);

    const [loading, setLoading] = useState(false);

    const handleSave = fields => {
        const userInfo = userParser.castToRecord(fields);
        setLoading(true);
        IpcRenderController.performAction({channelName: Channels.SAVE_ACCOUNT, data: userInfo})
            .then(user => onEdit(user))
            .catch(error => {
                CustomEvents.fire({
                    eventName: ApplicationEvents.SHOW_TOAST, detail: {
                        labels: {heading: Label.ToastErrorTitle, details: error}, variant: "error"
                    }
                });
            })
            .then(() => setLoading(false));
    };

    const inputFields = userParser.castToEditFields();
    return (
        <EditForm
            label={Label.Form_User_Edit}
            icon={<Icon category="standard" name="service_resource" size="medium"/>}
            loading={loading}
            fields={inputFields}
            onSave={handleSave}
            onCancel={onCancel}
        />
    );
};

export default UserEditForm;