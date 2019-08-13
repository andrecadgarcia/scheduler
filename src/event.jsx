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
            position: position === "absolute" ? position : "relative",
            marginLeft: hasPrevious ? "0px" : "4px",
            left: hasPrevious ? "0px" : "4px",
            marginRight: hasNext ? "0px" : "4px",
            right: hasNext ? "0px" : "4px",
            top: "24px",
            padding: "8px",
            height: "16px",
            borderRadius: `${hasPrevious ? 0 : 8}px ${hasNext ? 0 : 8}px ${hasNext ? 0 : 8}px ${hasPrevious ? 0 : 8}px`
        }
    }

    return (
        <div style={styles.view}>
            {!hasPrevious && <label>{title}</label>}
        </div>
    )
}

export default Event;