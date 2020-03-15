import React from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import ViewForm from "../../../commons/forms/ViewForm";
import Button from "@salesforce/design-system-react/module/components/button";
import ButtonGroup from "@salesforce/design-system-react/module/components/button-group";

import UserProxy from "../../../../modules/dao/proxies/user/UserProxy";

import {Label} from "../../../../modules/translation/LabelService";

const Telegram2FAViewForm = props => {
    const {user, loading, onValidateConnection, onEdit} = props;

    const proxiedUser = new UserProxy(user),
        inputFields = proxiedUser.castToFieldsForTelegramBotSetup();
    return (
        <ViewForm
            label={Label.Form_User_TelegramBot_SetupTitle}
            icon={<Icon category="utility" name="send" size="small"/>}
            headerActions={
                <ButtonGroup>
                    <Button label={Label.Btn_Edit} onClick={onEdit}/>
                    <Button
                        label={Label.Form_User_TelegramBot_ValidateConnection}
                        disabled={!proxiedUser.enableTelegram2FA}
                        variant="success"
                        onClick={onValidateConnection}
                    />
                </ButtonGroup>
            }
            loading={loading}
            fields={inputFields}
        />
    );
};

export default Telegram2FAViewForm;