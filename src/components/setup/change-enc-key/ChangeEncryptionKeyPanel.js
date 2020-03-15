import React, {useState} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import EditForm from "../../commons/forms/EditForm";
import Button from "@salesforce/design-system-react/module/components/button";

import IpcRenderController from "../../../controllers/IpcRenderController";
import CustomEvents from "../../../modules/util/CustomEvents";
import UserProxy from "../../../modules/dao/proxies/user/UserProxy";

import {ApplicationEvents, Channels, FormMode} from "../../../constants";
import {Label} from "../../../modules/translation/LabelService";

const ChangeEncryptionKeyPanel = props => {
    const {user, onSave} = props, userParser = new UserProxy(user);

    const [mode, setMode] = useState(FormMode.VIEW_MODE);
    const [loading, setLoading] = useState(false);

    const handleChangeEncryptionKey = fields => {
        setLoading(true);
        const userInfo = userParser.castToRecord(fields);
        IpcRenderController.performAction({channelName: Channels.CHANGE_ENC_KEY, data: userInfo})
            .then(userInfo => {
                onSave(userInfo);
                setMode(FormMode.VIEW_MODE);
            })
            .catch(error => {
                CustomEvents.fire({
                    eventName: ApplicationEvents.SHOW_TOAST, detail: {
                        labels: {heading: Label.Form_User_ChangeEncryptionKeyError, details: error}, variant: "error"
                    }
                });
            })
            .then(() => setLoading(false));
    };

    if (mode === FormMode.EDIT_MODE) {
        const inputFields = userParser.castToFieldsForKeyChange();
        return (
            <EditForm
                label={Label.Form_User_ChangeEncryptionKey}
                icon={<Icon category="utility" name="yubi_key" size="small"/>}
                loading={loading}
                fields={inputFields}
                onSave={handleChangeEncryptionKey}
                onCancel={() => setMode(FormMode.VIEW_MODE)}
            />
        );
    } else {
        return (
            <div className="slds-align--absolute-center slds-m-vertical--xx-large">
                <Button
                    label={Label.Form_User_ChangeEncryptionKey}
                    variant="brand"
                    onClick={() => setMode(FormMode.EDIT_MODE)}
                />
            </div>
        );
    }
};

export default ChangeEncryptionKeyPanel;