import {LANG_CODES} from "../translation/language-codes";
import {getLocale} from "../translation/LabelService";

class Util {
    static formatTimeStamp(dateNum = new Date().getTime()) {
        let langCode = getLocale(), localeParams = "EN-EN";
        if (langCode === LANG_CODES.UK) {
            localeParams = 'uk-UA';
        }
        return new Date(dateNum).toLocaleString(localeParams);
    }
}

export default Util;