import {CalendarDate} from "@oncody/objects";

class TimelineDataPoint {
    /** @param {CalendarDate} date
     * @param {number} value
     * @returns {TimelineDataPoint} */
    constructor(date, value) {
        /** @private */ this._date = date;
        /** @private */ this._value = value;
    }

    /** @returns {CalendarDate} */
    date = () => this._date;

    /** @returns {number} */
    value = () => this._value;
}

export {TimelineDataPoint}
