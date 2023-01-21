import {CalendarDate} from "@oncody/objects";

class TimelineDataPoint {
    /** @param {CalendarDate} date
     * @param {number} value
     * @param {string} tooltip
     * @returns {TimelineDataPoint} */
    constructor(date, value, tooltip) {
        /** @private */ this._date = date;
        /** @private */ this._value = value;
        /** @private */ this._tooltip = tooltip;
    }

    /** @returns {CalendarDate} */
    date = () => this._date;

    /** @returns {number} */
    value = () => this._value;

    /** @returns {string} */
    tooltip = () => this._tooltip;
}

export {TimelineDataPoint}
