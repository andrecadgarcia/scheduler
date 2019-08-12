import React, { useState } from "react";
import Moment from "moment";
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import Ripple from "./ripple";

const MonthView = props => {
    const { 
        borderColor = "#F6F6F6",
        dayColor = ["#626262", "#BFBFBF"],
        date = moment()
    } = props;

    const startMonth = moment(date).startOf("month");
    const endMonth = moment(date).endOf("month");
    const startCalendar = moment(startMonth).startOf("week");
    const endCalendar = moment(endMonth).endOf("week");
    const range = moment().range(startCalendar, endCalendar);
    const weeks = Array.from(range.by('weeks'));
    
    const styles = {
        calendar: {
            display: "flex",
            flexDirection: "column",
            borderTop: `1px solid ${borderColor}`,
            borderRight: `1px solid ${borderColor}`,
        }
    }
    
    return (
        <div style={styles.calendar}>
            <MonthToolbar borderColor={borderColor} /> 
            {weeks.map(startWeek => {
                const endWeek = moment(startWeek).endOf("week");
                const range = moment().range(startWeek, endWeek);
                const days = Array.from(range.by('days'));
                return (
                    <MonthRow 
                        key={`week#${startWeek.format("WW")}`}
                        borderColor={borderColor}
                    >
                        {days.map(day => {
                            return (
                                <MonthCell 
                                    key={`day#${day.format("DD")}`} label={day.format("DD")} 
                                    borderColor={borderColor}
                                    labelColor={day.isSame(date, "month") ? dayColor[0] : dayColor[1]}
                                />
                            );
                        })}
                    </MonthRow>
                );
            })}
        </div>
    );
}

export default MonthView;

const MonthToolbar = props => {
    const { labelColor = "#626262", borderColor } = props;
    const startWeek = moment().startOf("week");
    const endWeek = moment().endOf("week");
    const range = moment().range(startWeek, endWeek);
    const days = Array.from(range.by('days'));
    const styles = {
        weeksView: {
            display: "flex",
            justifyContent: "space-between",
            borderBottom: `1px solid ${borderColor}`
        },
        weekItem: {
            padding: "8px",
            width: "100%",
            textAlign: "center",
            color: labelColor
        }
    }
    return (
        <div style={styles.weeksView}>
            {days.map(day => <div style={styles.weekItem}>{day.format("dddd")}</div>)}
        </div>
    )
}

const MonthRow = props => {
    const { children = null, borderColor } = props;
    const styles = {
        row: {
            display: "flex",
            justifyContent: "space-evenly",
            borderBottom: `1px solid ${borderColor}`
        }
    }

    return (
        <div style={styles.row}> {children} </div>
    );
}

const MonthCell = props => {
    const { label = null, borderColor, labelColor } = props;
    const [newEvent, setNewEvent] = useState({
        show: false,
        positionX: 0,
        positionY: 0
    });
    const styles = {
        cell: {
            position: "relative",
            flex: "1",
            padding: "64px",
            borderLeft: `1px solid ${borderColor}`,
            cursor: "pointer"
        },
        dayLabel: {
            position: "absolute",
            right: "4px",
            top: "4px",
            fontSize: "16px",
            color: labelColor
        }
    }

    function startEvent(event) {
        setNewEvent({
            show: true,
            positionX: event.pageX - event.currentTarget.offsetLeft,
            positionY: event.pageY - event.currentTarget.offsetTop
        });
    } 

    function stopEvent() {
        setNewEvent({
            show: false,
            positionX: 0,
            positionY: 0
        });
    } 

    return (
        <div style={styles.cell} onMouseDown={startEvent} onMouseUp={stopEvent}>
            {label && <span style={styles.dayLabel}>{label}</span>}
            {newEvent.show && <Ripple posX={newEvent.positionX} posY={newEvent.positionY}/>}
        </div>
    );
}