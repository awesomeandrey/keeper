import {Links} from "../../constants";

const NavigationService = history => ({
    toDefault: () => history.push(Links.DEFAULT),
    toSetup: () => history.push(Links.SETUP),
    toVault: () => history.push(Links.VAULT),
    toKeyConfirmation: () => history.push(Links.KEY_CONFIRMATION),
    to: link => history.push(link)
});

export default NavigationService;