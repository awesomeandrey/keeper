import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import IconSettings from "@salesforce/design-system-react/module/components/icon-settings";
import BrandBand from "@salesforce/design-system-react/module/components/brand-band";
import Welcome from "./components/home/Welcome";
import Setup from "./components/setup/Setup";
import Vault from "./components/vault/Vault";
import ModalsContainer from "./components/commons/modals/ModalsContainer";
import ToastsContainer from "./components/commons/toasts/ToastsContainer";

import IpcRender from "./modules/ipc/IpcRender";
import CustomEvents from "./modules/util/CustomEvents";

import {Label} from "./modules/translation/LabelService";
import {Channels, Links} from "./constants";
import {HashRouter, Route} from "react-router-dom";

const AppContainer = () => {

    useEffect(() => {
        CustomEvents.register({
            eventName: "beforeunload",
            callback: () => IpcRender.send({channelName: Channels.QUIT_APP}),
            capture: false
        });
        // Pass 'Label' to main process, so that all error messages are also translated;
        IpcRender.send({channelName: Channels.LOAD_APP, data: {Label}});
    }, []);

    return (
        <IconSettings iconPath="./assets/icons">
            <ModalsContainer/>
            <ToastsContainer/>
            <BrandBand theme="lightning-blue" size="large">
                <div className="keeper-container" style={{height: "90vh"}}>
                    <HashRouter>
                        <Route path={Links.DEFAULT} exact component={Welcome}/>
                        <Route path={Links.SETUP} exact component={Setup}/>
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