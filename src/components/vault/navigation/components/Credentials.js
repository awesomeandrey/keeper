import React from "react";
import Credential from "./Credential";
import Draggable from "../../../commons/dnd/Draggable";

import CredentialProxy from "../../../../modules/dao/proxies/credential/CredentialProxy";
import itemTypes from "../../../commons/dnd/itemTypes";

const Credentials = props => {
    const {credentials = [], draggable = false} = props;

    return credentials.map(_ => {
        let credentialProxy = new CredentialProxy(_);
        if (draggable) {
            return (
                <Draggable key={credentialProxy.recordId} type={itemTypes.Credential} data={_}>
                    <Credential credentialProxy={credentialProxy}/>
                </Draggable>
            );
        } else {
            return (
                <Credential credentialProxy={credentialProxy}/>
            );
        }
    });
};

export default Credentials;