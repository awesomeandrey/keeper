import React, {useState} from "react";
import DataTable from "@salesforce/design-system-react/module/components/data-table";
import DataTableColumn from "@salesforce/design-system-react/module/components/data-table/column";
import Popover from "@salesforce/design-system-react/module/components/popover/popover";
import {Button} from "@salesforce/design-system-react";

import {Label} from "../../../modules/translation/LabelService";

const DeleteAccounts = props => {
    const {proxiedUsers, onCancel, onDelete} = props;

    const [selection, setSelection] = useState([]);
    const [openedPopover, setOpenedPopover] = useState(false);

    const handleChange = (event, data) => {
        setSelection(data.selection);
    };

    return (
        <div className="height-fill slds-p-bottom--x-large">
            <DataTable
                fixedHeader
                fixedLayout
                items={proxiedUsers}
                onRowChange={handleChange}
                selection={selection}
                selectRows="checkbox"
            >
                <DataTableColumn label={Label.Field_User_Name} property="name"/>
            </DataTable>
            <div className="slds-align--absolute-center">
                <Popover
                    heading={Label.Form_Grl_ConfirmationTitle}
                    isOpen={openedPopover}
                    onRequestClose={() => setOpenedPopover(false)}
                    align="top"
                    body={Label.Form_Grl_ConfirmationSubTitle}
                    footer={
                        <div className="slds-text-align_right">
                            <Button
                                label={Label.Btn_Confirm}
                                variant="destructive"
                                onClick={() => onDelete(selection)}
                            />
                            <Button
                                label={Label.Btn_Cancel}
                                onClick={() => setOpenedPopover(false)}
                            />
                        </div>
                    }
                >
                    <Button
                        label={Label.Btn_Delete}
                        variant="brand"
                        disabled={!selection.length}
                        onClick={() => setOpenedPopover(true)}
                    />
                </Popover>
                <Button
                    className="slds-m-left--xx-small"
                    label={Label.Btn_Cancel}
                    onClick={onCancel}
                />
            </div>
        </div>
    );
};

export default DeleteAccounts;