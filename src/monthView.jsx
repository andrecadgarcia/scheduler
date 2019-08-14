import React, { useState } from "react";
import Moment from "moment";
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import Event from "./event";
import { getCalendar } from "./util";

const MonthView = props => {
    const { 
        borderColor = "#F6F6F6",
        dayColor = ["#626262", "#BFBFBF"],
        date,
        onNext, onPrevious, 
        onNewEvent = null, onShowMore = null,
        events = []
    } = props;
    const [newEvent, setNewEvent] = useState(null);
    const [hoveringDate, setHoveringDate] = useState(null);
    const startMonth = moment(date).startOf("month");
    const endMonth = moment(date).endOf("month");
    const weeks = getCalendar(date);
    
    const styles = {
        calendar: {
            display: "flex",
            flexDirection: "column",
            borderTop: `1px solid ${borderColor}`,
            borderRight: `1px solid ${borderColor}`,
        }
    }

    function onDown(date) {
        if (!newEvent) {
            setNewEvent({
                position: "absolute",
                startDate: date,
                endDate: date,
                date: date
            });
            setHoveringDate(date);
        }
    }

    function onEnter(date) {
        if (newEvent) {
            setNewEvent(event => {
                const aEvent = { ...event }
                if (date.isBefore(aEvent.date)) {
                    aEvent.startDate = date;
                }
                else {
                    aEvent.startDate = aEvent.date;
                    aEvent.endDate = date;
                }
                return aEvent;
            });
            setHoveringDate(date);
        }
    }

    function onUp(date) {
        if (newEvent) {
            if (onNewEvent) {
                onNewEvent(newEvent);
            }
            setNewEvent(null);
            setHoveringDate(null);
        }
    }

    function onWheel(event) {
        if (event.nativeEvent.deltaY > 0) {
            if (hoveringDate) {
                onEnter(moment(hoveringDate).add(((weeks.length * 7) - (endMonth.weekday() !== 6 ? 7 : 0)), "days"));
            }
            onNext();
        }
        else {
            if (hoveringDate) {
                const prevWeeks = getCalendar(moment(hoveringDate).subtract(1, "month"));
                onEnter(moment(hoveringDate).subtract(((prevWeeks.length * 7) - (startMonth.weekday() !== 0 ? 7 : 0)), "days"));
            }
            onPrevious();
        }
    }
    
    return (
        <div style={styles.calendar}>
            <MonthToolbar borderColor={borderColor} />
            <div style={{ position: "relative" }} onWheel={onWheel}>
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
                                        key={`day#${day.format("DD")}`} 
                                        date={day} 
                                        borderColor={borderColor}
                                        labelColor={day.isSame(date, "month") ? dayColor[0] : dayColor[1]}
                                        onMouseDown={onDown} 
                                        onMouseUp={onUp} 
                                        onMouseEnter={onEnter}
                                        newEvent={newEvent && day.isBetween(newEvent.startDate, newEvent.endDate, "day", "[]") ? { hasNext: day.isBefore(newEvent.endDate), hasPrevious: day.isAfter(newEvent.startDate) } : null}
                                        events={
                                            events.filter(item => day.isBetween(item.startDate, item.endDate, "day", "[]")).map((item, index) => { 
                                                return { position: index, hasNext: day.isBefore(item.endDate), hasPrevious: day.isAfter(item.startDate) };
                                            })
                                        }
                                        onShowMore={onShowMore}
                                    />
                                );
                            })}
                        </MonthRow>
                    );
                })}
            </div>
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
    const { date = null, borderColor, labelColor, events = [], newEvent = null, onShowMore = null } = props;
    const styles = {
        cell: {
            position: "relative",
            flex: "1",
            height: "128px",
            borderLeft: `1px solid ${borderColor}`,
            cursor: "pointer",
            overflow: "auto"
        },
        dayLabel: {
            position: "absolute",
            right: "4px",
            top: "4px",
            fontSize: "16px",
            color: labelColor
        }
    }

    function onMouseDown(event) {
        if (event.button !== 0 || (event.target && event.target.id === "showMore")) return;
        if (props.onMouseDown) {
            props.onMouseDown(date);
        }
        event.stopPropagation();
        event.preventDefault();
    }

    function onMouseUp(event) {
        if (props.onMouseUp) {
            props.onMouseUp(date);
        }
        event.stopPropagation();
        event.preventDefault();
    }

    function onMouseEnter(event) {
        if (props.onMouseEnter) {
            props.onMouseEnter(date);
        }
        event.stopPropagation();
        event.preventDefault();
    }

    function onMouseLeave(event) {
        if (props.onMouseLeave) {
            props.onMouseLeave(date);
        }
        event.stopPropagation();
        event.preventDefault();
    }

    function showMoreClicked(event) {
        if (onShowMore) {
            onShowMore(events);
        }
        event.stopPropagation();
        event.preventDefault();
    }
    
    const showMore = events.length > 2;

    return (
        <div style={styles.cell} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {date && <span style={styles.dayLabel}>{date.format("DD")}</span>}
            {newEvent && <Event {...newEvent} />}
            {events.slice(0, 2).map(item => <Event {...item} />)}
            {showMore && <div id="showMore" onClick={showMoreClicked} style={{ position: "absolute", bottom: "4px", width: "100%" }}> ...Show More </div>}
        </div>
    );
}