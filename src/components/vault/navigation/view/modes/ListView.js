import React from "react";
import Credentials from "../../components/Credentials";
import EmptyArea from "../../../../commons/EmptyArea";

import {Label} from "../../../../../modules/translation/LabelService";

const ListView = ({credentials = []}) => {
    return (
        <div className="slds-is-relative">
            {
                credentials.length
                    ? <Credentials credentials={credentials}/>
                    : <EmptyArea label={Label.Grl_EmptySet} iconName="all"/>
            }
        </div>
    );
};

export default ListView;