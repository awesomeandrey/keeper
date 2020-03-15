import React, {useState, useEffect} from "react";
import EmptyArea from "../../../../commons/EmptyArea";
import Folders from "./Folders";
import Credentials from "./Credentials";
import Input from "@salesforce/design-system-react/module/components/input";
import InputIcon from "@salesforce/design-system-react/module/components/icon/input-icon";
import ButtonGroup from "@salesforce/design-system-react/module/components/button-group";
import ButtonStateful from "@salesforce/design-system-react/module/components/button-stateful";

import CredentialProxy from "../../../../../modules/dao/proxies/credential/CredentialProxy";

import {Label} from "../../../../../modules/translation/LabelService";

const ViewModes = {
    LIST: "listMode", FOLDER: "folderMode"
};

const ViewModeContainer = props => {
    const {folders = [], credentialsWithoutParentFolder = [], allCredentials = []} = props;

    const [isSearch, setSearch] = useState(false);
    const [mode, setMode] = useState(ViewModes.FOLDER);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredCredentials, setFilteredCredentials] = useState([]);

    useEffect(() => {
        if (!!searchKeyword && allCredentials.length) {
            setSearch(true);
            setFilteredCredentials(
                allCredentials.filter(_ => {
                    const credName = CredentialProxy.init(_).name.toLowerCase();
                    return credName.includes(searchKeyword.toLowerCase());
                })
            );
        } else {
            setSearch(false);
        }
    }, [searchKeyword, allCredentials]);

    useEffect(() => {
        setSearch(false);
        setSearchKeyword("");
        setFilteredCredentials([]);
    }, [mode]);

    const isVaultEmpty = !folders.length && !credentialsWithoutParentFolder.length && !allCredentials.length;
    if (isVaultEmpty) {
        return <EmptyArea label={Label.Grl_EmptyVault} iconName="all"/>;
    } else {
        return (
            <div className="slds-is-relative">
                <div className="slds-grid slds-m-bottom--small">
                    <div className="slds-col">
                        <Input
                            placeholder={Label.Form_Grl_InputPlaceholder}
                            iconLeft={<InputIcon name="search" category="utility"/>}
                            iconRight={
                                <InputIcon name="clear" category="utility" onClick={() => setSearchKeyword("")}/>
                            }
                            value={searchKeyword}
                            onChange={event => setSearchKeyword(event.target.value)}
                        />
                    </div>
                    <div className="slds-col slds-grow-none">
                        <ButtonGroup className="slds-float--right">
                            <ButtonStateful
                                active={mode === ViewModes.LIST}
                                buttonVariant="icon"
                                iconName="list"
                                iconVariant="border"
                                variant="icon"
                                onClick={() => setMode(ViewModes.LIST)}
                            />
                            <ButtonStateful
                                active={mode === ViewModes.FOLDER}
                                iconName="layers"
                                iconVariant="border"
                                variant="icon"
                                onClick={() => setMode(ViewModes.FOLDER)}
                            />
                        </ButtonGroup>
                    </div>
                </div>
                {isSearch && !filteredCredentials.length && <EmptyArea label={Label.Grl_EmptySet} iconName="all"/>}
                {isSearch && <Credentials credentials={filteredCredentials}/>}
                {!isSearch && mode === ViewModes.LIST && <Credentials credentials={allCredentials}/>}
                {!isSearch && mode === ViewModes.FOLDER && <FoldersView {...props}/>}
            </div>
        );
    }
};

const FoldersView = ({folders, credentialsWithoutParentFolder}) => {
    return (
        <div className="slds-is-relative">
            <Folders folders={folders}/>
            <Credentials credentials={credentialsWithoutParentFolder}/>
        </div>
    );
};

export default ViewModeContainer;