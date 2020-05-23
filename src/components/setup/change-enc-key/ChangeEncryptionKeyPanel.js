import React, {useState} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import EditForm from "../../commons/forms/EditForm";
import Button from "@salesforce/design-system-react/module/components/button";

import IpcRenderController from "../../../controllers/IpcRenderController";
import UserProxy from "../../../modules/dao/proxies/user/UserProxy";

import {Channels, FormMode} from "../../../constants";
import {Label} from "../../../modules/translation/LabelService";
import {error} from "../../../modules/util/toastify";

const ChangeEncryptionKeyPanel = props => {
    const {user, onSave} = props, userParser = new UserProxy(user);

    const [mode, setMode] = useState(FormMode.VIEW);
    const [loading, setLoading] = useState(false);

    const handleChangeEncryptionKey = fields => {
        setLoading(true);
        const userInfo = userParser.toRecord(fields);
        IpcRenderController.performAction({channelName: Channels.CHANGE_ENC_KEY, data: userInfo})
            .then(userInfo => {
                onSave(userInfo);
                setMode(FormMode.VIEW);
            })
            .catch(errorText => error({title: Label.Form_User_ChangeEncryptionKeyError, message: errorText}))
            .then(() => setLoading(false));
    };

    if (mode === FormMode.EDIT) {
        const inputFields = userParser.castToFieldsForKeyChange();
        return (
            <EditForm
                label={Label.Form_User_ChangeEncryptionKey}
                icon={<Icon category="utility" name="yubi_key" size="small"/>}
                loading={loading}
                fields={inputFields}
                onSave={handleChangeEncryptionKey}
                onCancel={() => setMode(FormMode.VIEW)}
            />
        );
    } else {
        return (
            <div className="slds-align--absolute-center slds-m-vertical--xx-large">
                <Button
                    label={Label.Form_User_ChangeEncryptionKey}
                    variant="brand"
                    onClick={() => setMode(FormMode.EDIT)}
                />
            </div>
        );
    }
};

export default ChangeEncryptionKeyPanel;