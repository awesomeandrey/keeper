import React, {useState} from "react";
import Button from "@salesforce/design-system-react/module/components/button";
import {Spinner} from "@salesforce/design-system-react";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import CustomEvents from "../../../../modules/util/CustomEvents";

import {error} from "../../../../modules/util/toastify";
import {ApplicationEvents, Channels} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const FolderDeleteButton = props => {
    const {user: userInfo, folder, onDelete} = props;

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        IpcRenderController.performAction({channelName: Channels.DELETE_FOLDER, data: {userInfo, folder}})
            .then(() => CustomEvents.fire({eventName: ApplicationEvents.SELECT_CRED_ITEM}))
            .then(() => onDelete())
            .catch(errorText => error({title: Label.ToastErrorTitle, message: errorText}))
    };

    return (
        <div className="slds-is-relative slds-float--right">
            {loading && <div className="slds-p-around--medium"><Spinner variant="brand" size="small"/></div>}
            {!loading && <Button label={Label.Btn_Confirm} variant="destructive" onClick={handleDelete}/>}
        </div>
    );
};

export default FolderDeleteButton;