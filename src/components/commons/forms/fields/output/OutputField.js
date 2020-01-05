import React, {useState} from "react";
import Button from "@salesforce/design-system-react/module/components/button";
import OutputCheckbox from "./components/OutputCheckbox";
import OutputPicklist from "./components/OutputPicklist";

import IpcRenderController from "../../../../../controllers/IpcRenderController";
import CustomEvents from "../../../../../modules/util/CustomEvents";

import {isValidUrl} from "../../../../../modules/util/InputValidator";
import {ApplicationEvents, Channels, FieldTypes} from "../../../../../constants";
import {Label} from "../../../../../modules/translation/LabelService";

const copyToClipboard = str => {
    const element = document.createElement("textarea");
    element.value = str;
    element.setAttribute("readonly", "");
    element.style.position = "absolute";
    element.style.left = "-9999px";
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
};

const OutputField = props => {
    const {type = FieldTypes.CUSTOM} = props;

    if ([FieldTypes.TEXT, FieldTypes.FILE].includes(type)) {
        return <OutputText {...props} />;
    } else if (type === FieldTypes.PASSWORD) {
        return <OutputPassword {...props} />;
    } else if (type === FieldTypes.LINK) {
        return <OutputLink {...props} />;
    } else if (type === FieldTypes.CUSTOM) {
        return <OutputCustomField {...props}/>;
    } else if (type === FieldTypes.CHECKBOX) {
        return <OutputCheckbox {...props}/>;
    } else if (type === FieldTypes.PICKLIST) {
        return <OutputPicklist {...props}/>;
    } else if (type === FieldTypes.DATETIME) {
        let value = new Date(props.value).toLocaleString();
        return <OutputText {...props} value={value} allowCopyToClipboard={false}/>;
    }
    return <p>Unsupported field type.</p>
};

/**
 * Container for output field implementations.
 */
const OutputFieldContainer = props => {
    const {label, value, allowCopyToClipboard = true} = props;
    return (
        <div className="slds-form-element slds-form-element_edit slds-form-element_readonly slds-m-bottom--small">
            <span className="slds-form-element__label">{label}</span>
            <div className="slds-form-element__control">
                {props.children}
                {
                    allowCopyToClipboard &&
                    <Button
                        iconCategory="utility"
                        iconName="copy_to_clipboard"
                        iconSize="small"
                        iconVariant="bare"
                        onClick={() => {
                            copyToClipboard(value);
                            CustomEvents.fire({
                                eventName: ApplicationEvents.SHOW_TOAST, detail: {
                                    labels: {heading: Label.ToastSuccessTitle, details: Label.Msg_CopiedToClipboard},
                                    variant: "success"
                                }
                            });
                        }}
                        variant="icon"
                    />
                }
            </div>
        </div>
    );
};

/**
 * Output field implementations.
 */

const OutputText = props => {
    return (
        <OutputFieldContainer {...props}>
            <div className="slds-form-element__static">{props.value}</div>
        </OutputFieldContainer>
    );
};

const OutputPassword = props => {
    const [visible, setVisible] = useState(false);
    return (
        <OutputFieldContainer {...props}>
            <div
                className="slds-form-element__static"
                onClick={() => setVisible(!visible)}
            >
                <input
                    type={visible ? "text" : "password"}
                    style={{
                        background: "rgba(0,0,0,0)",
                        border: "none"
                    }}
                    value={props.value}
                    disabled
                />
            </div>
        </OutputFieldContainer>
    );
};

const OutputLink = props => {
    const {value} = props;

    const handleOpenLink = event => {
        event.preventDefault();
        IpcRenderController.performAction({channelName: Channels.OPEN_LINK, data: value});
    };

    return (
        <OutputFieldContainer {...props}>
            <div className="slds-form-element__static">
                <a href="/" onClick={handleOpenLink}>{value}</a>
            </div>
        </OutputFieldContainer>
    );
};

const OutputCustomField = props => {
    const {value} = props;
    if (isValidUrl(value)) {
        return <OutputLink {...props}/>;
    }
    return <OutputText{...props}/>;
};

export default OutputField;