import React from "react";

const Event = props => {
    const {
        id = null,
        title = "Sem Título",
        color = "#E8E8E8",
        position = "absolute",
        hasNext = false,
        hasPrevious = false
    } = props;
    
    const styles = {
        view: {
            backgroundColor: color,
            padding: "8px",
            height: "16px",
            borderRadius: `${hasPrevious ? 0 : 8}px ${hasNext ? 0 : 8}px ${hasNext ? 0 : 8}px ${hasPrevious ? 0 : 8}px`
        },
        absoluteView: {
            position: "absolute",
            left: hasPrevious ? "0px" : "4px",
            right: hasNext ? "0px" : "4px"
        },
        relativeView: {
            position: "relative",
            marginTop: position === 0 ? "24px" : "4px",
            marginLeft: hasPrevious ? "0px" : "4px",
            marginRight: hasNext ? "0px" : "4px"
        },
    }

    let containerView = { ...styles.view, };
    if (position === "absolute") {
        containerView = { ...containerView, ...styles.absoluteView };
    }
    else {
        containerView = { ...containerView, ...styles.relativeView };
    }

    return (
        <div style={containerView}>
            {!hasPrevious && <label>{title}</label>}
        </div>
    )
}

export default Event;