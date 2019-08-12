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
    return (
        <div>
            <SchedulerToolbar />
            <MonthView />
        </div>
    );
}
export default Scheduler;

const SchedulerToolbar = props => {
    const { 
        date = moment(),
        view = __VIEWS__.month,
        views = [ __VIEWS__.day, __VIEWS__.week, __VIEWS__.month ],
        toolBarColor = "#F5F5F5",
        labelColor = "#767676"
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
                <div style={styles.navigatorArrows}> {"<"} </div>
                <div style={styles.navigatorCenter}> {date.format("MMM-YY")} </div>
                <div style={styles.navigatorArrows}> {">"} </div>
            </div>
            <div style={styles.views}>
                {views.map(item => <div style={view.id === item.id ? styles.viewsItemActive : styles.viewsItem}>{item.label}</div>)}
            </div>
        </div>
    )
}

