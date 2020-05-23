import React, {useState} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import EditForm from "../../../commons/forms/EditForm";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import UserProxy from "../../../../modules/dao/proxies/user/UserProxy";

import {Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";
import {error} from "../../../../modules/util/toastify";

const UserCreateForm = props => {
    const {onCreate, onCancel} = props, userParser = new UserProxy();

    const [loading, setLoading] = useState(false);

    const handleSave = fields => {
        setLoading(true);
        const userInfo = userParser.toRecord(fields);
        IpcRenderController.performAction({channelName: Channels.CREATE_ACCOUNT, data: userInfo})
            .then(_ => onCreate({...userInfo, ..._}))
            .catch(errorText => error({title: Label.Form_User_CreateError, message: errorText}))
            .then(() => setLoading(false));
    };

    const inputFields = userParser.toCreateFields();
    return (
        <EditForm
            label={Label.Form_User_Create}
            icon={<Icon category="standard" name="contact" size="medium"/>}
            loading={loading}
            fields={inputFields}
            onSave={handleSave}
            onCancel={onCancel}
        />
    );
};

export default UserCreateForm;