import React, {useState, useEffect} from "react";
import Modal from "@salesforce/design-system-react/module/components/modal";

import CustomEvents from "../../../modules/util/CustomEvents";

import {ApplicationEvents} from "../../../constants";

const initState = {
    opened: false,
    heading: null,
    content: null,
    footer: null,
    onClose: null
};

const ModalsContainer = () => {
    const [state, setState] = useState(initState);

    const handleCloseModal = () => {
        const {onClose} = state;
        if (typeof onClose === "function") {
            onClose();
        }
        setState(initState);
    };

    useEffect(() => {
        CustomEvents.register({
            eventName: ApplicationEvents.OPEN_MODAL, callback: event => {
                let _state = {...event.detail, opened: true};
                setState(_state);
            }
        });
        CustomEvents.register({
            eventName: ApplicationEvents.CLOSE_MODAL, callback: () => setState(initState)
        });
    }, []);

    const {opened, heading, content, footer} = state;
    return (
        <Modal
            heading={heading}
            footer={footer}
            isOpen={opened}
            onRequestClose={handleCloseModal}
        >
            <section className={typeof content === "string" ? "slds-p-around--small" : ""}>{content}</section>
        </Modal>
    );
};

export default ModalsContainer;