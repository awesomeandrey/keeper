import React from "react";
import Credential from "./Credential";

import RecordProxy from "../../../../../modules/dao/proxies/common/RecordProxy";

const Credentials = props => {
    const {credentials = []} = props;
    return credentials.map(_ => {
        let proxiedRecord = new RecordProxy(_);
        return <Credential key={proxiedRecord.recordId} credential={proxiedRecord.record}/>
    });
};

export default Credentials;