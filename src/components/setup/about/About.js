import React from "react";
import MediaObject from "@salesforce/design-system-react/module/components/media-object";
import Icon from "@salesforce/design-system-react/module/components/icon";

import IpcRenderController from "../../../controllers/IpcRenderController";

import {Label} from "../../../modules/translation/LabelService";
import {Channels} from "../../../constants";

const link = "https://github.com/awesomeandrey/keeper";

const About = () => {

    const handleClick = event => {
        event.preventDefault();
        IpcRenderController.performAction({channelName: Channels.OPEN_LINK, data: link});
    };

    return (
        <MediaObject
            className="slds-m-around--small"
            verticalCenter={true}
            figure={<Icon category="action" name="web_link" size="medium"/>}
            body={
                <div>
                    <p>{Label.Grl_AboutApp}</p>
                    <p><a href="/" onClick={handleClick}>{link}</a></p>
                </div>
            }
        />
    );
};

export default About;