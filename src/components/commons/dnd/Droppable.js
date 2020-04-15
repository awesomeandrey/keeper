import React, {useRef} from "react";
import {useDrop} from "react-dnd";

const Droppable = props => {
    const {
        types = [],
        dropZoneLabel = "",
        isOverClassName = "",
        onDrop
    } = props;
    const ref = useRef(null);

    const [{canDrop, isOver, isOverCurrent}, drop] = useDrop({
        accept: types, // types of draggable items to handle;
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({shallow: true})
        }),
        drop(item, monitor) {
            if (monitor.didDrop()) return;
            if (typeof onDrop === "function") {
                onDrop(item);
            }
        },
        canDrop(item, monitor) {
            return monitor.isOver({shallow: true});
        }
    });

    const isDropZone = canDrop && isOver && isOverCurrent;
    let className = isDropZone ? "slds-drop-zone slds-drop-zone__container slds-is-hovered" : "slds-is-relative";
    if (isOver && isOverClassName) {
        className = [className, isOverClassName].join(" ");
    }

    drop(ref);

    return (
        <div ref={ref} className={className}>
            {props.children}
            {dropZoneLabel && isOverCurrent && <div className="slds-drop-zone__label">
                <div className="slds-media slds-media_center">
                    <div className="slds-media__body"><h2>{dropZoneLabel}</h2></div>
                </div>
            </div>}
        </div>
    );
};

export default Droppable;