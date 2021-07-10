import React, {useState, useEffect} from "react";
import InputField from "./fields/input/InputField";
import Card from "../Card";
import ButtonGroup from "@salesforce/design-system-react/module/components/button-group";
import Button from "@salesforce/design-system-react/module/components/button";
import Icon from "@salesforce/design-system-react/module/components/icon";
import {Spinner} from "@salesforce/design-system-react";

import shortId from "shortid";
import {FieldTypes} from "../../../constants";
import {test, isValidUrl} from "../../../modules/util/InputValidator";
import {Label} from "../../../modules/translation/LabelService";
import {warning} from "../../../modules/util/toastify";

const EditForm = props => {
    const {
        label,
        icon = <Icon category="utility" name="edit_form" size="small"/>,
        hasCustomFields = false,
        loading = false,
        fields = [],
        saveButtonLbl = Label.Btn_Save,
        onSave,
        onCancel
    } = props;

    const [inputFields, setInputFields] = useState(fields);
    const [changesDetected, setChangesDetected] = useState(false);

    useEffect(() => {
        setInputFields(fields);
    }, [fields]);

    const handleChange = fieldDef => {
        const {name} = fieldDef, _inputFields = inputFields.map(_ => _.name === name ? fieldDef : _);
        setInputFields(_inputFields);
        if (!changesDetected) {
            setChangesDetected(true);
        }
    };

    const handleSave = event => {
        event.preventDefault();
        const allFieldsValid = inputFields.reduce((_allFieldsValid, {value, type, required, pattern}) => {
            if (required && !value) {
                return false;
            } else if (type === FieldTypes.LINK && !!value && !isValidUrl(value)) {
                return false;
            } else if (!!value && !!pattern && !test(value, pattern)) {
                return false;
            }
            return _allFieldsValid && true;
        }, true);
        if (allFieldsValid && typeof onSave === "function") {
            onSave(inputFields);
        } else {
            warning({title: Label.Form_Grl_WrongInput, message: Label.Form_Grl_VerifyInput});
        }
    };

    const handleAddCustomField = () => {
        const customFieldShell = {
            name: shortId.generate(),
            type: FieldTypes.CUSTOM,
            createdDateNum: new Date().getTime(),
        };
        setInputFields([...inputFields, customFieldShell]);
    };

    const handleDeleteCustomField = fieldDef => {
        setInputFields(
            inputFields.filter(({name}) => name !== fieldDef.name)
        );
        if (!changesDetected) {
            setChangesDetected(true);
        }
    };

    const handleCancel = () => {
        if (typeof onCancel === "function") {
            onCancel();
        }
    };

    return (
        <Card
            className="slds-p-bottom--small height-fill"
            label={label}
            icon={icon}
            headerActions={
                <ButtonGroup>
                    <Button
                        label={saveButtonLbl}
                        variant="brand"
                        disabled={!changesDetected}
                        onClick={handleSave}
                    />
                    <Button
                        label={Label.Btn_Cancel}
                        onClick={handleCancel}
                    />
                </ButtonGroup>
            }
        >
            {loading && <Spinner variant="brand" size="medium"/>}
            <form className="slds-p-horizontal--x-small" onSubmit={handleSave}>
                {
                    inputFields.map(_ => (
                        <InputField
                            key={_.name}
                            fieldDef={_}
                            onChange={handleChange}
                            onDelete={handleDeleteCustomField}
                        />
                    ))
                }
                {
                    hasCustomFields && <Button
                        label={Label.Grl_Form_AddField}
                        className="slds-m-top_x-small"
                        variant="base"
                        onClick={handleAddCustomField}
                    />
                }
                <input type="submit" className="slds-hide"/>
            </form>
        </Card>
    );
};

export default EditForm;