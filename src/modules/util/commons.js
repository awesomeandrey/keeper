import {getLocale} from "../translation/LabelService";
import {LANG_CODES} from "../translation/language-codes";

export const formatTimeStamp = (dateNum = new Date().getTime()) => {
    let langCode = getLocale(), localeParams = "EN-EN";
    if (langCode === LANG_CODES.UK) {
        localeParams = 'uk-UA';
    }
    return new Date(dateNum).toLocaleString(localeParams);
}

export const copyToClipboard = str => {
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