import React, {useState} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import ViewForm from "../../../commons/forms/ViewForm";
import Button from "@salesforce/design-system-react/module/components/button";
import ButtonGroup from "@salesforce/design-system-react/module/components/button-group";
import Dropdown from "@salesforce/design-system-react/module/components/menu-dropdown";
import CredentialMoveForm from "./CredentialMoveForm";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import CustomEvents from "../../../../modules/util/CustomEvents";
import CredentialProxy from "../../../../modules/dao/proxies/credential/CredentialProxy";

import {success, error} from "../../../../modules/util/toastify";
import {ApplicationEvents, Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const CredentialViewForm = props => {
    const {user: userInfo, credential, onDelete} = props, proxiedCredential = new CredentialProxy(credential);

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        IpcRenderController.performAction({channelName: Channels.DELETE_CREDENTIAL, data: {userInfo, credential}})
            .then(() => CustomEvents.fire({eventName: ApplicationEvents.REFRESH_DATA}))
            .then(() => onDelete())
            .then(() => success({title: Label.ToastSuccessTitle, message: Label.Form_Credential_Msg_Deleted}))
            .catch(errorText => error({title: Label.Form_Credential_DeleteError, message: errorText}))
            .then(() => setLoading(false));
    };

    const handleMove = () => {
        const closeModal = () => CustomEvents.fire({eventName: ApplicationEvents.CLOSE_MODAL});
        const closeModalAndRefresh = () => {
            closeModal();
            CustomEvents.fire({eventName: ApplicationEvents.REFRESH_DATA});
        };
        CustomEvents.fire({
            eventName: ApplicationEvents.OPEN_MODAL,
            detail: {
                content: (
                    <CredentialMoveForm
                        user={userInfo}
                        credential={credential}
                        onMove={closeModalAndRefresh}
                        onCancel={closeModal}
                    />
                )
            }
        });
    };

    const outputFields = proxiedCredential.toViewFields();
    return (
        <ViewForm
            label={proxiedCredential.name}
            loading={loading}
            headerActions={
                <FormActions
                    {...props}
                    onMove={handleMove}
                    onDelete={handleDelete}
                />
            }
            icon={<Icon category="utility" name="lock" size="small"/>}
            fields={outputFields}
        />
    );
};

const FormActions = props => {
    const {onEdit, onMove, onDelete} = props;

    const handleDelete = () => {
        CustomEvents.fire({eventName: ApplicationEvents.CLOSE_MODAL});
        onDelete();
    };

    return (
        <ButtonGroup>
            <Button
                label={Label.Btn_Edit}
                onClick={onEdit}
            />
            <Dropdown
                buttonVariant="icon"
                align="right"
                iconCategory="utility"
                iconName="down"
                iconVariant="border-filled"
                width="x-small"
                onSelect={({value}) => {
                    if (value === "delete") {
                        CustomEvents.fire({
                            eventName: ApplicationEvents.OPEN_MODAL,
                            detail: {
                                heading: Label.Form_Grl_ConfirmationTitle,
                                content: Label.Form_Credential_DeleteConfirmation,
                                footer: ([
                                    <Button
                                        label={Label.Btn_Confirm}
                                        variant="destructive"
                                        onClick={handleDelete}
                                    />
                                ])
                            }
                        });
                    } else if (value === "move") {
                        onMove();
                    }
                }}
                options={[
                    {label: Label.Btn_Delete, value: "delete", leftIcon: {name: "delete", category: "utility"}},
                    {label: Label.Btn_Move, value: "move", leftIcon: {name: "move", category: "utility"}}
                ]}
            />
        </ButtonGroup>
    );
};

export default CredentialViewForm;