import React from "react";
import MediaObject from "@salesforce/design-system-react/module/components/media-object";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../controllers/IpcRenderController";
import useGlobal from "../../../modules/globalState";

import {Label} from "../../../modules/translation/LabelService";
import {Channels} from "../../../constants";

const About = () => {
    const [globalState] = useGlobal(), {appLink} = globalState;

    const handleClick = event => {
        event.preventDefault();
        IpcRenderController.performAction({channelName: Channels.OPEN_LINK, data: appLink});
    };

    return (
        <MediaObject
            className="slds-m-around--small"
            verticalCenter={true}
            figure={<Icon category="action" name="web_link" size="medium"/>}
            body={[<p>{Label.Grl_AboutApp}</p>, <a href="/" onClick={handleClick}>{appLink}</a>]}
        />
    );
};

export default About;