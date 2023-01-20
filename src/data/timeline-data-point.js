import {CalendarDate} from "@oncody/objects";

class TimelineDataPoint {
    /** @param {CalendarDate} date
     * @param {number} value
     * @param {string} tooltip
     * @returns {TimelineDataPoint} */
    constructor(date, value, tooltip) {
        this._date = date;
        this._value = value;
        this._tooltip = tooltip;
    }

    /** @returns {CalendarDate} */
    date() {
        return this._date;
    }

    /** @returns {number} */
    value() {
        return this._value;
    }

    /** @returns {string} */
    tooltip() {
        return this._tooltip;
    }
}

export {TimelineDataPoint}
