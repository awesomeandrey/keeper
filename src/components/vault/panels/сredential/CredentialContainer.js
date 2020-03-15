import React, {useState, useEffect} from "react";
import CredentialCreateForm from "./forms/CredentialCreateForm";
import CredentialEditForm from "./forms/CredentialEditForm";
import CredentialViewForm from "./forms/CredentialViewForm";
import Box from "../../../commons/Box";
import EmptyArea from "../../../commons/EmptyArea";
import CustomEvents from "../../../../modules/util/CustomEvents";

import {ApplicationEvents, FormMode} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const CredentialContainer = props => {
    const {user} = props;

    const [credential, setCredential] = useState(null);
    const [targetFolder, setTargetFolder] = useState(null);
    const [mode, setMode] = useState(FormMode.VIEW_MODE);

    useEffect(() => {
        CustomEvents.register({
            eventName: ApplicationEvents.SELECT_FOLDER,
            callback: ({detail}) => setTargetFolder(detail)
        });
        CustomEvents.register({
            eventName: ApplicationEvents.CREATE_CRED_ITEM, callback: () => {
                setCredential(null);
                setMode(FormMode.CREATE_MODE);
            }
        });
        CustomEvents.register({
            eventName: ApplicationEvents.SELECT_CRED_ITEM, callback: event => {
                const selectedCredential = event.detail;
                setCredential(selectedCredential);
                setMode(FormMode.VIEW_MODE);
            }
        });
    }, []);

    if (mode === FormMode.CREATE_MODE) {
        return (
            <CredentialCreateForm
                user={user}
                targetFolder={targetFolder}
                onCreate={_ => {
                    setCredential(_);
                    setMode(FormMode.VIEW_MODE);
                }}
                onCancel={() => setMode(FormMode.VIEW_MODE)}
            />
        );
    } else if (!credential) {
        return (
            <Box>
                <EmptyArea
                    label={Label.Form_Credential_Empty}
                    iconName="action_list_component"
                />
            </Box>
        );
    } else if (mode === FormMode.EDIT_MODE) {
        return (
            <CredentialEditForm
                user={user}
                credential={credential}
                onEdit={_ => {
                    setCredential(_);
                    setMode(FormMode.VIEW_MODE);
                }}
                onCancel={() => setMode(FormMode.VIEW_MODE)}
            />
        );
    } else {
        return (
            <CredentialViewForm
                user={user}
                credential={credential}
                onEdit={() => setMode(FormMode.EDIT_MODE)}
                onDelete={() => {
                    setCredential(null);
                    setMode(FormMode.VIEW_MODE);
                }}
            />
        );
    }
};

export default CredentialContainer;