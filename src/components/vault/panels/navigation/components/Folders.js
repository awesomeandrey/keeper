import React from "react";
import Folder from "./Folder";

const Folders = props => {
    const {folders = []} = props;
    return folders.map(_ => <Folder key={_.id} folder={_}/>);
};

export default Folders;