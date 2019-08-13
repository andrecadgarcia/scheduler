import moment from "moment";

export function getCalendar(date) {
    const startMonth = moment(date).startOf("month");
    const endMonth = moment(date).endOf("month");
    const startCalendar = moment(startMonth).startOf("week");
    const endCalendar = moment(endMonth).endOf("week");
    const range = moment().range(startCalendar, endCalendar);
    const weeks = Array.from(range.by('weeks'));
    return weeks;
}