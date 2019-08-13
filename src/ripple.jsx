import React, { useState } from "react";

const Ripple = props => {
    const { 
        color = "#136E9B",
        style = {},
        posX = 0,
        posY = 0,
        width = 32,
        height = 32
    } = props;
    const [spanStyles, setSpanStyles] = useState({});
    const [count, setCount] = useState(0); 
    const [rippleWidth, setRippleWidth] = useState(width); 

    const styles = {
        view: {
            backgroundColor: `${color}33`,
            borderRadius: width/2,
            width: rippleWidth,
            height: height,
            position: "absolute",
            top: posY - height/2,
            left: posX - width/2
        }
    }

    function onDrag(event) {
        console.log(posX, event.nativeEvent.offsetX);
        setRippleWidth(event.nativeEvent.offsetX);
    }

    return (
        <div style={{ ...styles.view, ...style }} draggable="true" onDrag={onDrag}/>
    );
}

export default Ripple;