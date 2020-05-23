import React, {useState, useEffect} from "react";
import FolderView from "./modes/FolderView";
import ListView from "./modes/ListView";
import Input from "@salesforce/design-system-react/module/components/input";
import InputIcon from "@salesforce/design-system-react/module/components/icon/input-icon";
import ButtonGroup from "@salesforce/design-system-react/module/components/button-group";
import ButtonStateful from "@salesforce/design-system-react/module/components/button-stateful";
import DndContainer from "../../../commons/dnd/DndContainer";

import CredentialProxy from "../../../../modules/dao/proxies/credential/CredentialProxy";
import {Label} from "../../../../modules/translation/LabelService";

const ViewModes = {LIST: "list", FOLDER: "folder"};

const ViewModeContainer = props => {
    const {allCredentials = []} = props;

    const [mode, setMode] = useState(ViewModes.FOLDER);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredCredentials, setFilteredCredentials] = useState(allCredentials);

    useEffect(() => {
        if (!!searchKeyword && allCredentials.length) {
            setMode(ViewModes.LIST);
            setFilteredCredentials(
                allCredentials.filter(_ => {
                    const credName = new CredentialProxy(_).name.toLowerCase();
                    return credName.includes(searchKeyword.toLowerCase());
                })
            );
        } else {
            setFilteredCredentials(allCredentials);
        }
    }, [searchKeyword, allCredentials]);

    useEffect(() => {
        setSearchKeyword("");
        setFilteredCredentials(allCredentials);
    }, [mode, allCredentials]);

    return (
        <div className="slds-is-relative">
            <div className="slds-grid slds-m-top--xx-small slds-m-bottom--x-small">
                <div className="slds-col">
                    <Input
                        placeholder={Label.Form_Grl_InputPlaceholder}
                        iconLeft={<InputIcon name="search" category="utility"/>}
                        iconRight={
                            <InputIcon
                                name="clear"
                                category="utility"
                                onClick={() => setSearchKeyword("")}
                            />
                        }
                        value={searchKeyword}
                        onChange={event => setSearchKeyword(event.target.value)}
                        onFocus={() => setMode(ViewModes.LIST)}
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
            <DndContainer>
                {mode === ViewModes.LIST && <ListView credentials={filteredCredentials}/>}
                {mode === ViewModes.FOLDER && <FolderView {...props}/>}
            </DndContainer>
        </div>
    );
};

export default ViewModeContainer;