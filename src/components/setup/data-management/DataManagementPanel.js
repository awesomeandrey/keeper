import React, {useState, useEffect} from "react";
import Button from "@salesforce/design-system-react/module/components/button";
import Popover from "@salesforce/design-system-react/module/components/popover/popover";
import ExpandableSection from "@salesforce/design-system-react/module/components/expandable-section";
import InputField from "../../commons/forms/fields/input/InputField";
import {Spinner} from "@salesforce/design-system-react";

import IpcRenderController from "../../../controllers/IpcRenderController";
import CustomEvents from "../../../modules/util/CustomEvents";
import UserProxy from "../../../modules/dao/proxies/user/UserProxy";

import {Label} from "../../../modules/translation/LabelService";
import {ApplicationEvents, Channels} from "../../../constants";

const DataManagementPanel = props => {
    const {user} = props, userParser = new UserProxy(user);

    const [isOpened, setOpened] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleImport = fieldDef => {
        setLoading(true);
        IpcRenderController.performAction({
            channelName: Channels.IMPORT_DB_SNAPSHOT, data: {userInfo: user, snapshotFilePath: fieldDef.value}
        }).then(() => {
            CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.ToastSuccessTitle, details: Label.ToastSuccessSubTitle}, variant: "success"
                }
            });
        }).catch(error => {
            CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.Form_User_ImportDataError, details: error}, variant: "error"
                }
            });
        }).then(() => setLoading(false));
    };

    const handleExport = fieldDef => {
        setLoading(true);
        IpcRenderController.performAction({
            channelName: Channels.EXPORT_DB_SNAPSHOT, data: {userInfo: user, targetFolderPath: fieldDef.value}
        }).then(() => {
            CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.ToastSuccessTitle, details: Label.ToastSuccessSubTitle}, variant: "success"
                }
            });
        }).catch(error => {
            CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.Form_User_ExportDataError, details: error}, variant: "error"
                }
            });
        }).then(() => setLoading(false));
    };

    return (
        <div>
            {loading && <Spinner variant="brand" size="medium"/>}
            <ExpandableSection
                title={Label.Form_User_ImportData}
                isOpen={isOpened}
                onToggleOpen={() => setOpened(!isOpened)}
            >
                <ArtifactInputForm
                    buttonLabel={Label.Form_User_ImportData}
                    confirmationMessage={Label.Form_User_ImportDataConfirmation}
                    fileFieldDef={userParser.fieldForFileImport}
                    onSave={handleImport}
                />
            </ExpandableSection>
            <ExpandableSection
                title={Label.Form_User_ExportData}
                isOpen={!isOpened}
                onToggleOpen={() => setOpened(!isOpened)}
            >
                <ArtifactInputForm
                    buttonLabel={Label.Form_User_ExportData}
                    confirmationMessage={Label.Form_User_ExportDataConfirmation}
                    fileFieldDef={userParser.fieldForFileExport}
                    onSave={handleExport}
                />
            </ExpandableSection>
        </div>
    );
};

const ArtifactInputForm = props => {
    const {buttonLabel, confirmationMessage, fileFieldDef, onSave} = props;

    const [fieldDef, setFieldDef] = useState(fileFieldDef);
    const [showConfirmationPopover, setShowConfirmationPopover] = useState(false);

    useEffect(() => {
        setFieldDef(fileFieldDef);
    }, [fileFieldDef]);

    const handleExecuteAction = () => {
        if (!fieldDef || !fieldDef.value) {
            CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.Form_Grl_WrongInput, details: Label.Form_Grl_VerifyInput}, variant: "warning"
                }
            });
            return;
        }
        setShowConfirmationPopover(false);
        onSave(fieldDef);
    };

    return (
        <div className="slds-box slds-box--x-small">
            <InputField
                fieldDef={fieldDef}
                onChange={_ => setFieldDef(_)}
            />
            <div className="slds-x-small-buttons_horizontal slds-m-top--small">
                <Popover
                    heading={Label.Form_Grl_ConfirmationTitle}
                    isOpen={showConfirmationPopover}
                    onRequestClose={() => setShowConfirmationPopover(false)}
                    align="bottom"
                    body={confirmationMessage}
                    footer={
                        <div className="slds-text-align_right">
                            <Button
                                label={Label.Btn_Confirm}
                                variant="success"
                                onClick={handleExecuteAction}
                            />
                            <Button
                                label={Label.Btn_Cancel}
                                onClick={() => setShowConfirmationPopover(false)}
                            />
                        </div>
                    }
                >
                    <Button
                        label={buttonLabel}
                        variant="brand"
                        onClick={() => setShowConfirmationPopover(true)}
                    />
                </Popover>
            </div>
        </div>
    );
};

export default DataManagementPanel;