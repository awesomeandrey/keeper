import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import IconSettings from "@salesforce/design-system-react/module/components/icon-settings";
import BrandBand from "@salesforce/design-system-react/module/components/brand-band";
import Welcome from "./components/home/Welcome";
import Setup from "./components/setup/Setup";
import KeyConfirmationPanel from "./components/auth/KeyConfirmationPanel";
import Telegram2FAConfirmationPanel from "./components/auth/Telegram2FAConfirmationPanel";
import Vault from "./components/vault/Vault";
import ModalsContainer from "./components/commons/modals/ModalsContainer";
import ToastsContainer from "./components/commons/toasts/ToastsContainer";

import IpcRenderController from "./controllers/IpcRenderController";
import IpcRender from "./modules/ipc/IpcRender";
import CustomEvents from "./modules/util/CustomEvents";
import useGlobal from "./modules/globalState";

import {Label} from "./modules/translation/LabelService";
import {Channels, Links} from "./constants";
import {HashRouter, Route} from "react-router-dom";

const AppContainer = () => {
    const [, globalActions] = useGlobal();

    useEffect(() => {
        CustomEvents.register({
            eventName: "beforeunload",
            callback: () => IpcRender.send({channelName: Channels.QUIT_APP}),
            capture: false
        });
        // Pass 'Label' to main process, so that all error messages are also translated;
        IpcRenderController.performAction({channelName: Channels.LOAD_APP, data: {Label}})
            .then(({appVersion}) => globalActions.setAppVersion(appVersion));
    }, [globalActions]);

    return (
        <IconSettings iconPath="./assets/icons">
            <ModalsContainer/>
            <ToastsContainer/>
            <BrandBand theme="lightning-blue" size="large">
                <div className="keeper-container" style={{height: "90vh"}}>
                    <HashRouter>
                        <Route path={Links.DEFAULT} exact component={Welcome}/>
                        <Route path={Links.SETUP} exact component={Setup}/>
                        <Route path={Links.KEY_CONFIRMATION} exact component={KeyConfirmationPanel}/>
                        <Route path={Links.TELEGRAM_TWO_FACTOR_CONFIRMATION} exact
                               component={Telegram2FAConfirmationPanel}/>
                        <Route path={Links.VAULT} exact component={Vault}/>
                    </HashRouter>
                </div>
            </BrandBand>
        </IconSettings>
    )
};

ReactDOM.render(
    <AppContainer/>, document.querySelector("#app")
);