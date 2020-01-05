import React, {useState, useEffect} from "react";
import InputField from "./fields/input/InputField";
import Card from "../Card";
import ButtonGroup from "@salesforce/design-system-react/module/components/button-group";
import Button from "@salesforce/design-system-react/module/components/button";
import {Spinner} from "@salesforce/design-system-react";

import CustomEvents from "../../../modules/util/CustomEvents";
import shortId from "shortid";

import {FieldTypes, ApplicationEvents} from "../../../constants";
import {test, isValidUrl} from "../../../modules/util/InputValidator";
import {Label} from "../../../modules/translation/LabelService";

const EditForm = props => {
    const {label, icon, hasCustomFields = true, loading, fields = [], onSave, onCancel} = props;

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
            CustomEvents.fire({
                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                    labels: {heading: Label.Form_Grl_WrongInput, details: Label.Form_Grl_VerifyInput},
                    variant: "warning"
                }
            });
        }
    };

    const handleAddCustomField = () => {
        const customFieldShell = {
            name: shortId.generate(),
            type: FieldTypes.CUSTOM
        };
        setInputFields([...inputFields, customFieldShell]);
    };

    const handleDeleteCustomField = fieldDef => {
        fieldDef.label = "";
        fieldDef.value = "";
        fieldDef.deleted = true;
        handleChange(fieldDef);
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
                        label={Label.Btn_Save}
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