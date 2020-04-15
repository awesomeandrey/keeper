import React, {useRef} from "react";
import {useDrag} from "react-dnd";

const Draggable = props => {
    const {data, type, children} = props;
    const ref = useRef(null);

    const [{isDragging}, drag] = useDrag({
        item: {type, ...data},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(ref);

    return <div ref={ref} className={`${isDragging && "dragging-item"}`}>{children}</div>;
};

export default Draggable;