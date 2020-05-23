import React, {useState} from "react";
import EditForm from "../../../commons/forms/EditForm";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import UserProxy from "../../../../modules/dao/proxies/user/UserProxy";

import {Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";
import {error} from "../../../../modules/util/toastify";

const UserEditForm = props => {
    const {user, onEdit, onCancel} = props, userParser = new UserProxy(user);

    const [loading, setLoading] = useState(false);

    const handleSave = fields => {
        const userInfo = userParser.toRecord(fields);
        setLoading(true);
        IpcRenderController.performAction({channelName: Channels.SAVE_ACCOUNT, data: userInfo})
            .then(user => onEdit(user))
            .catch(errorText => error({title: Label.ToastErrorTitle, message: errorText}))
            .then(() => setLoading(false));
    };

    const inputFields = userParser.toEditFields();
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