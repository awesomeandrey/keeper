import {Links} from "../../constants";

const NavigationService = history => ({
    toDefault: () => history.push(Links.DEFAULT),
    toSetup: () => history.push(Links.SETUP),
    toVault: () => history.push(Links.VAULT),
    toKeyConfirmation: () => history.push(Links.KEY_CONFIRMATION),
    toTelegram2FA: () => history.push(Links.TELEGRAM_TWO_FACTOR_CONFIRMATION),
    to: link => history.push(link)
});

export default NavigationService;