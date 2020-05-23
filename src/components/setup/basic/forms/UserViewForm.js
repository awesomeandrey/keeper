import React, {useState} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import ViewForm from "../../../commons/forms/ViewForm";
import ButtonGroup from "@salesforce/design-system-react/module/components/button-group";
import Button from "@salesforce/design-system-react/module/components/button";
import Popover from "@salesforce/design-system-react/module/components/popover/popover";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import UserProxy from "../../../../modules/dao/proxies/user/UserProxy";

import {Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";
import {error} from "../../../../modules/util/toastify";

const UserViewForm = props => {
    const {user, onDelete} = props, userParser = new UserProxy(user);

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        IpcRenderController.performAction({channelName: Channels.DELETE_ACCOUNT, data: user})
            .then(() => onDelete())
            .catch(errorText => error({title: Label.Form_User_DeleteError, message: errorText}))
            .then(() => setLoading(false));
    };

    const outputFields = userParser.toViewFields();
    return (
        <ViewForm
            label={Label.Form_User_View}
            loading={loading}
            headerActions={<FormActions {...props} onDelete={handleDelete}/>}
            icon={<Icon category="standard" name="service_resource" size="medium"/>}
            fields={outputFields}
        />
    );
};

const FormActions = ({onEdit, onDelete}) => {
    const [showPopover, togglePopover] = useState(false);
    return (
        <ButtonGroup>
            <Button
                label={Label.Btn_Edit}
                variant="brand"
                onClick={onEdit}
            />
            <Popover
                heading={Label.Form_Grl_ConfirmationTitle}
                isOpen={showPopover}
                onRequestClose={() => togglePopover(!showPopover)}
                align="bottom"
                body={Label.Form_Grl_ConfirmationSubTitle}
                footer={
                    <div className="slds-text-align_right">
                        <Button
                            label={Label.Btn_Cancel}
                            onClick={() => togglePopover(!showPopover)}
                        />
                        <Button
                            variant="destructive"
                            label={Label.Btn_DeleteAccount}
                            onClick={onDelete}
                        />
                    </div>
                }
            >
                <Button
                    label={Label.Btn_Delete}
                    variant="neutral"
                    onClick={() => togglePopover(!showPopover)}
                />
            </Popover>
        </ButtonGroup>
    );
};

export default UserViewForm;