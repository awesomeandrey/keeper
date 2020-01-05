import React, {useState, useEffect} from "react";
import Icon from "@salesforce/design-system-react/module/components/icon";
import Card from "../../../commons/Card";
import FolderForm from "../folder/FolderForm";
import Dropdown from "@salesforce/design-system-react/module/components/menu-dropdown";
import DropdownTrigger from "@salesforce/design-system-react/module/components/menu-dropdown/button-trigger";
import Button from "@salesforce/design-system-react/module/components/button";
import CredentialsViewContainer from "./components/CredentialsViewContainer";
import {Spinner} from "@salesforce/design-system-react";

import IpcRenderController from "../../../../controllers/IpcRenderController";
import CustomEvents from "../../../../modules/util/CustomEvents";

import {ApplicationEvents, Channels, FormMode} from "../../../../constants";
import {Label} from "../../../../modules/translation/LabelService";

const closeModal = () => CustomEvents.fire({eventName: ApplicationEvents.CLOSE_MODAL});

const refresh = () => CustomEvents.fire({eventName: ApplicationEvents.REFRESH_DATA});

const NavigationContainer = props => {
    const {user} = props;

    const [rootFolder, setRootFolder] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleEditFolder = event => {
            CustomEvents.fire({
                eventName: ApplicationEvents.OPEN_MODAL,
                detail: {
                    content: (
                        <FolderForm
                            user={user}
                            folder={event.detail}
                            mode={FormMode.EDIT_MODE}
                            onEdit={() => {
                                refresh();
                                closeModal();
                            }}
                            onCancel={closeModal}
                        />
                    )
                }
            });
        };
        CustomEvents.register({eventName: ApplicationEvents.EDIT_FOLDER, callback: handleEditFolder});
        const handleDeleteFolder = event => {
            const onDelete = () => {
                setLoading(true);
                IpcRenderController.performAction({
                    channelName: Channels.DELETE_FOLDER, data: {userInfo: user, folder: event.detail}
                })
                    .then(() => CustomEvents.fire({eventName: ApplicationEvents.SELECT_CRED_ITEM}))
                    .catch(error => {
                        CustomEvents.fire({
                            eventName: ApplicationEvents.SHOW_TOAST, detail: {
                                labels: {heading: Label.ToastErrorTitle, details: error},
                                variant: "error"
                            }
                        });
                    })
                    .then(() => setLoading(false))
                    .then(() => {
                        refresh();
                        closeModal();
                    });
            };
            CustomEvents.fire({
                eventName: ApplicationEvents.OPEN_MODAL,
                detail: {
                    heading: Label.Form_Grl_ConfirmationTitle,
                    content: Label.Form_Folder_DeleteConfirmation,
                    footer: ([
                        <Button
                            label={Label.Btn_Confirm}
                            variant="destructive"
                            onClick={onDelete}
                        />
                    ])
                }
            });
        };
        CustomEvents.register({eventName: ApplicationEvents.DELETE_FOLDER, callback: handleDeleteFolder});
        const handleRefreshData = () => {
            setLoading(true);
            IpcRenderController.performAction({channelName: Channels.BUILD_ROOT_FOLDER_DEF, data: user})
                .then(_ => setRootFolder(_))
                .catch(error => {
                    CustomEvents.fire({
                        eventName: ApplicationEvents.SHOW_TOAST, detail: {
                            labels: {heading: Label.ToastErrorTitle, details: error}, variant: "error"
                        }
                    });
                })
                .then(() => setLoading(false));
        };
        CustomEvents.register({eventName: ApplicationEvents.REFRESH_DATA, callback: handleRefreshData});
        setTimeout(handleRefreshData, 1); // Split execution context;
        return () => {
            CustomEvents.unregister({eventName: ApplicationEvents.EDIT_FOLDER, callback: handleEditFolder});
            CustomEvents.unregister({eventName: ApplicationEvents.DELETE_FOLDER, callback: handleDeleteFolder});
            CustomEvents.unregister({eventName: ApplicationEvents.REFRESH_DATA, callback: handleRefreshData});
        };
    }, [user]);

    return (
        <Card
            label={Label.Grl_Vault}
            className="height-fill"
            icon={<Icon category="standard" name="entitlement"/>}
            headerActions={
                <NavActions user={user}/>
            }
        >
            {
                loading
                    ? <Spinner variant="brand" size="medium"/>
                    : <CredentialsViewContainer {...rootFolder}/>
            }
        </Card>
    );
};

const NavActions = props => {
    const {user} = props;

    const [selectedFolder, selectFolder] = useState(null);

    useEffect(() => {
        CustomEvents.register({
            eventName: ApplicationEvents.SELECT_FOLDER, callback: event => selectFolder(event.detail)
        });
        CustomEvents.register({
            eventName: "keydown", callback: event => {
                if (event.key === "Escape" || event.keyCode === 27) {
                    CustomEvents.fire({eventName: ApplicationEvents.SELECT_NAV_ITEM, detail: null});
                    CustomEvents.fire({eventName: ApplicationEvents.SELECT_CRED_ITEM, detail: null});
                    selectFolder(null);
                }
            }
        });
    }, []);

    const handleSelectOption = option => {
        const {value} = option;
        if (value === "credential") {
            CustomEvents.fire({
                eventName: ApplicationEvents.CREATE_CRED_ITEM,
                detail: {
                    targetFolder: selectedFolder
                }
            });
        } else if (value === "folder") {
            CustomEvents.fire({
                eventName: ApplicationEvents.OPEN_MODAL,
                detail: {
                    content: (
                        <FolderForm
                            user={user}
                            parentFolder={selectedFolder}
                            onCreate={() => {
                                refresh();
                                closeModal();
                            }}
                            onCancel={closeModal}
                        />
                    )
                }
            });
        }
    };

    const options = [
        {label: Label.Grl_Credential, value: "credential", leftIcon: {name: "lock", category: "utility"}},
        {label: Label.Grl_Folder, value: "folder", leftIcon: {name: "open_folder", category: "utility"}}
    ];
    return (
        <Dropdown
            options={options}
            width="x-small"
            onSelect={handleSelectOption}
        >
            <DropdownTrigger>
                <Button
                    iconCategory="utility"
                    iconName="down"
                    iconPosition="right"
                    label={Label.Btn_CreateNew}
                    variant="brand"
                />
            </DropdownTrigger>
        </Dropdown>
    );
};

export default NavigationContainer;