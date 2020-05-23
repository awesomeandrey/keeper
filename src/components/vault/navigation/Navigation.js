import React, {useState, useEffect, useCallback} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import Card from "../../commons/Card";
import ActionsPanel from "./panels/ActionsPanel";
import ViewModeContainer from "./view/ViewModeContainer";
import EmptyArea from "../../commons/EmptyArea";
import RecentCredentials from "./panels/RecentCredentials";
import {Spinner} from "@salesforce/design-system-react";

import IpcRenderController from "../../../controllers/IpcRenderController";
import CustomEvents from "../../../modules/util/CustomEvents";
import {error} from "../../../modules/util/toastify";
import {ApplicationEvents, Channels} from "../../../constants";
import {Label} from "../../../modules/translation/LabelService";

const Navigation = props => {
    const {user} = props;

    const [rootFolder, setRootFolder] = useState({});
    const [loading, setLoading] = useState(false);

    const refreshData = useCallback(() => {
        setLoading(true);
        IpcRenderController.performAction({channelName: Channels.BUILD_ROOT_FOLDER_DEF, data: user})
            .then(result => setRootFolder(result))
            .catch(errorText => error({title: Label.ToastErrorTitle, message: errorText}))
            .then(() => setLoading(false));
    }, [user]);

    const dropCredential = useCallback(({detail: credential}) => {
        setLoading(true);
        IpcRenderController.performAction({channelName: Channels.SAVE_CREDENTIAL, data: {userInfo: user, credential}})
            .catch(errorText => error({title: Label.Form_Credential_EditError, message: errorText}))
            .then(refreshData);
    }, [user, refreshData]);

    useEffect(() => {
        CustomEvents.register({
            eventName: "keydown", callback: event => {
                if (event.key === "Escape" || event.keyCode === 27) {
                    CustomEvents.fire({eventName: ApplicationEvents.SELECT_NAV_ITEM, detail: null});
                    CustomEvents.fire({eventName: ApplicationEvents.SELECT_CRED_ITEM, detail: null});
                    CustomEvents.fire({eventName: ApplicationEvents.SELECT_FOLDER, detail: null});
                }
            }
        });
        CustomEvents.register({eventName: ApplicationEvents.REFRESH_DATA, callback: refreshData});
        CustomEvents.register({eventName: ApplicationEvents.DROP_CREDENTIAL, callback: dropCredential});
        setTimeout(() => CustomEvents.fire({eventName: ApplicationEvents.REFRESH_DATA}), 10);
        return () => {
            CustomEvents.unregister({eventName: ApplicationEvents.REFRESH_DATA, callback: refreshData});
            CustomEvents.unregister({eventName: ApplicationEvents.DROP_CREDENTIAL, callback: dropCredential});
        };
    }, [user, refreshData, dropCredential]);

    const isVaultEmpty = ((rootFolder) => {
        let {folders = [], credentialsWithoutParentFolder = [], allCredentials = []} = rootFolder;
        return !folders.length && !credentialsWithoutParentFolder.length && !allCredentials.length;
    })(rootFolder);
    return (
        <Card
            label={Label.Grl_Vault}
            className="height-fill"
            icon={<Icon category="custom" name="custom73"/>}
            headerActions={<ActionsPanel/>}
            footer={<RecentCredentials/>}
        >
            {loading && <Spinner variant="brand" size="medium"/>}
            {!isVaultEmpty && <ViewModeContainer {...rootFolder}/>}
            {isVaultEmpty && <EmptyArea label={Label.Grl_EmptyVault} iconName="all"/>}
        </Card>
    );
};

export default Navigation;