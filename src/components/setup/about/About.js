import React from "react";
import MediaObject from "@salesforce/design-system-react/module/components/media-object";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../controllers/IpcRenderController";

import {Label} from "../../../modules/translation/LabelService";
import {Channels, General} from "../../../constants";

const appLink = General.AppLink;

const About = () => {

    const handleClick = event => {
        event.preventDefault();
        IpcRenderController.performAction({channelName: Channels.OPEN_LINK, data: appLink});
    };

    return (
        <MediaObject
            className="slds-m-around--small"
            verticalCenter={true}
            figure={<Icon category="standard" name="apex" size="medium"/>}
            body={[<p>{Label.Grl_AboutApp}</p>, <a href="/" onClick={handleClick}>{appLink}</a>]}
        />
    );
};

export default About;