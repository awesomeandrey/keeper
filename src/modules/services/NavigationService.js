import {Links} from "../../constants";

const NavigationService = history => ({
    toDefault: () => history.push(Links.DEFAULT),
    toSetup: () => history.push(Links.SETUP),
    toVault: () => history.push(Links.VAULT),
    to: link => history.push(link)
});

export default NavigationService;