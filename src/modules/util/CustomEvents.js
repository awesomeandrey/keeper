const _validateParamsForEventRegistration = (eventName, callback) => {
    if (!eventName || typeof callback !== "function") {
        throw new Error("While adding event listener, make sure that 'eventName' and 'callback' params are not undefined!");
    }
};

const register = ({eventName, callback, capture = false}) => {
    _validateParamsForEventRegistration(eventName, callback);
    window.addEventListener(eventName, callback, capture);
};

const unregister = ({eventName, callback}) => {
    _validateParamsForEventRegistration(eventName, callback);
    window.removeEventListener(eventName, callback);
};

const registerOnce = function ({eventName, callback, capture = false}) {
    _validateParamsForEventRegistration(eventName, callback);
    const listenerFunc = event => {
        callback(event);
        window.removeEventListener(eventName, listenerFunc);
    };
    register({eventName, callback: listenerFunc, capture});
};

const fire = ({eventName, detail = null}) => {
    if (!eventName) {
        throw new Error("'eventName' cannot be null!");
    }
    let evt = new CustomEvent(eventName, {detail});
    window.dispatchEvent(evt);
};

const CustomEvents = {
    register,
    unregister,
    registerOnce,
    fire
};
export default CustomEvents;