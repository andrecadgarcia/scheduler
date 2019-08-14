import React, { useState } from "react";
import MonthView from "./monthView"
import moment from "moment";

const __VIEWS__ = {
    day: {
        id: 0,
        label: "Dia"
    },
    week: {
        id: 1,
        label: "Semana"
    },
    month: {
        id: 2,
        label: "Mês"
    },
}

const Scheduler = props => {
    const [view, setView] = useState(__VIEWS__.month);
    const [date, setDate] = useState(moment());
    const [events, setEvents] = useState([]);

    function onNewEvent(event) {
        setEvents(events => {
            const aEvents = [ ...events];
            aEvents.push(event);
            return aEvents
        });        
    }

    function onShowMore(events) {
        console.log(events)
    }

    const sortedEvents = events.sort((a, b) => a.startDate.diff(a.endDate, 'days') - b.startDate.diff(b.endDate, 'days'));

    return (
        <div>
            <SchedulerToolbar date={date} onNext={() => setDate(moment(date).add(1, "months"))} onPrevious={() => setDate(moment(date).subtract(1, "months"))} />
            <MonthView 
                date={date} 
                onNext={() => setDate(moment(date).add(1, "months"))} 
                onPrevious={() => setDate(moment(date).subtract(1, "months"))} 
                onNewEvent={onNewEvent}
                events={sortedEvents}
                onShowMore={onShowMore}
            />
        </div>
    );
}
export default Scheduler;

const SchedulerToolbar = props => {
    const { 
        date,
        view = __VIEWS__.month,
        views = [ __VIEWS__.day, __VIEWS__.week, __VIEWS__.month ],
        toolBarColor = "#F5F5F5",
        labelColor = "#767676",
        onNext, onPrevious
    } = props;
    const styles = {
        container: {
            height: "48px",
            display: "flex",
            alignItems: "center",
            backgroundColor: toolBarColor,
            color: labelColor
        },
        navigator: {
            marginLeft: "8px",
            display: "flex",
            alignItems: "center"
        },
        navigatorArrows: {
            padding: "8px",
            backgroundColor: "#FFF",
            border: `1px solid ${toolBarColor}`,
            cursor: "pointer",
            "&:hover": {
                opacity: "0.5"
            }
        },
        navigatorCenter: {
            padding: "8px 64px",
            backgroundColor: "#FFF",
            border: `1px solid ${toolBarColor}`
        },
        views: {
            marginLeft: "auto",
            display: "flex",
            alignItems: "center"
        },
        viewsItem: {
            padding: "16px",
            cursor: "pointer",
            "&:hover": {
                opacity: "0.5"
            }
        },
        viewsItemActive: {
            padding: "16px",
            backgroundColor: "#FFF",
            border: `1px solid ${toolBarColor}`,
            cursor: "pointer",
            "&:hover": {
                opacity: "0.5"
            }
        }
    }
    
    return (
        <div style={styles.container}>
            <div style={styles.navigator}>
                <div style={styles.navigatorArrows} onClick={onPrevious}> {"<"} </div>
                <div style={styles.navigatorCenter}> {date.format("MMM-YY")} </div>
                <div style={styles.navigatorArrows} onClick={onNext}> {">"} </div>
            </div>
            <div style={styles.views}>
                {views.map(item => <div style={view.id === item.id ? styles.viewsItemActive : styles.viewsItem}>{item.label}</div>)}
            </div>
        </div>
    )
}

