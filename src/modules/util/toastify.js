import CustomEvents from "./CustomEvents";
import {ApplicationEvents} from "../../constants";

const showToast = (variant) => ({title, message}) => {
    CustomEvents.fire({
        eventName: ApplicationEvents.SHOW_TOAST,
        detail: {variant, labels: {heading: title, details: message}}
    });
};

export const success = params => {
    showToast("success")(params);
};

export const warning = params => {
    showToast("warning")(params);
};

export const error = params => {
    showToast("error")(params);
};

export const info = params => {
    showToast("info")(params);
};