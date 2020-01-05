import React, {useState} from "react";
import UserCreateForm from "./forms/UserCreateForm";
import UserViewForm from "./forms/UserViewForm";
import UserEditForm from "./forms/UserEditForm";

import IpcRender from "../../../modules/ipc/IpcRender";
import NavigationService from "../../../modules/services/NavigationService";
import UserProxy from "../../../modules/dao/proxies/user/UserProxy";

import {useHistory} from "react-router-dom";
import {Channels, FormMode} from "../../../constants";
import {Label, setLocale} from "../../../modules/translation/LabelService";

const UserForm = props => {
    const {user, onCreate, onUpdate, onDelete} = props;
    const history = useHistory(), navService = NavigationService(history);

    const [mode, setMode] = useState(!!user ? FormMode.VIEW_MODE : FormMode.CREATE_MODE);

    const handleCreate = userInfo => {
        let proxiedUser = new UserProxy(userInfo);
        setLocale(proxiedUser.lang);
        onCreate(proxiedUser.record);
    };

    const handleUpdate = userInfo => {
        let proxiedUser = new UserProxy(userInfo);
        setLocale(proxiedUser.lang);
        setMode(FormMode.VIEW_MODE);
        onUpdate(proxiedUser.record);
        // Pass 'Label' to main process, so that all error messages are also translated;
        IpcRender.send({channelName: Channels.LOAD_APP, data: {Label}});
    };

    const handleCancel = () => {
        if (mode === FormMode.CREATE_MODE) {
            navService.toDefault();
        } else if (mode === FormMode.EDIT_MODE) {
            setMode(FormMode.VIEW_MODE);
        }
    };

    const handleDelete = () => {
        setLocale();
        onDelete();
    };

    if (mode === FormMode.CREATE_MODE) {
        return (
            <UserCreateForm
                onCreate={handleCreate}
                onCancel={handleCancel}/>
        );
    } else if (mode === FormMode.VIEW_MODE) {
        return (
            <UserViewForm
                user={user}
                onEdit={() => setMode(FormMode.EDIT_MODE)}
                onDelete={handleDelete}
            />
        );
    } else if (mode === FormMode.EDIT_MODE) {
        return (
            <UserEditForm
                user={user}
                onEdit={handleUpdate}
                onCancel={handleCancel}
            />
        );
    }
};

export default UserForm;