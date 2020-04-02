import React, {useState, useEffect} from "react";
import ToastContainer from "@salesforce/design-system-react/module/components/toast/container";
import Toast from "@salesforce/design-system-react/module/components/toast";

import CustomEvents from "../../../modules/util/CustomEvents";

import {ApplicationEvents} from "../../../constants";
import {generate} from "shortid";

const ToastsContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handlerFunc = ({detail: toastDef}) => {
            toastDef.id = generate();
            setToasts(_ => [..._, toastDef]);
        };
        CustomEvents.register({eventName: ApplicationEvents.SHOW_TOAST, callback: handlerFunc});
        return () => {
            CustomEvents.unregister({eventName: ApplicationEvents.SHOW_TOAST, callback: handlerFunc});
        }
    }, []);

    const handleCloseToast = toastDef => {
        setToasts(
            toasts.filter(_ => _.id !== toastDef.id)
        );
    };

    const toastElements = toasts.map(toastDef => {
            const {labels, variant = "info"} = toastDef;
            return (
                <Toast
                    key={toastDef.id}
                    labels={labels}
                    duration={variant === "error" ? 5000 : 2500}
                    variant={variant} // error | info | success | warning;
                    onRequestClose={() => handleCloseToast(toastDef)}
                />
            );
        }
    );
    return (
        <ToastContainer>
            {toastElements}
        </ToastContainer>
    );
};

export default ToastsContainer;