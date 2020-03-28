import Translations from "./translations";

import {LANG_CODES} from "./language-codes";

const DEFAULT_LANG_CODE = LANG_CODES.EN;
const LANG_KEY = "lang";

const handler = {
    get(target, labelKey) {
        let langCode = DEFAULT_LANG_CODE;
        if (window.localStorage) {
            langCode = window.localStorage.getItem(LANG_KEY) || DEFAULT_LANG_CODE;
        } else {
            console.error(">>> LabelService.js", "`localStorage` is not supported.");
        }
        if (!!target[labelKey]) {
            return target[labelKey][langCode] || "Unsupported Label Translation";
        } else {
            return "Unknown Label Name";
        }
    }
};

export const Label = new Proxy(Translations, handler);

export const setLocale = (lang = DEFAULT_LANG_CODE) => {
    if (window.localStorage) {
        window.localStorage.setItem(LANG_KEY, lang);
    }
};

export const getLocale = () => {
    if (window.localStorage) {
        return window.localStorage.getItem(LANG_KEY);
    }
    return DEFAULT_LANG_CODE;
};