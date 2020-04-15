import React from "react";
import HTML5Backend from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const DndContainer = ({children}) => {
    return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default DndContainer;