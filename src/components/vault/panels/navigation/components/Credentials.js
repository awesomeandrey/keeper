import React from "react";
import Credential from "./Credential";

import CredentialProxy from "../../../../../modules/dao/proxies/credential/CredentialProxy";

const Credentials = props => {
    const {credentials = []} = props;
    return credentials.map(_ => {
        let proxiedRecord = new CredentialProxy(_);
        return <Credential key={proxiedRecord.recordId} proxiedCredential={proxiedRecord}/>
    });
};

export default Credentials;