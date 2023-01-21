import {Arrays, DateCreator, Month, CalendarDate} from "@oncody/objects";
import {TimelineDataPoint} from "./timeline-data-point.js";

const STARTING_YEAR = 2023;

class TimelineDataSet {
    /** @param {string} name
     * @param {TimelineDataPoint[]} dataPoints
     * @returns {TimelineDataSet} */
    constructor(name, dataPoints) {
        /** @private */ this._name = name;
        /** @private */ this._dataPoints = TimelineDataSet._normalizeData(dataPoints);
        /** @private */ this._max = Arrays.max(this._dataPoints.map(dataPoint => dataPoint.value()));
    }

    /** @private
     * @param {TimelineDataPoint[]} dataPoints
     * @returns {TimelineDataPoint[]} */
    static _normalizeData = dataPoints => {
        let sortedPoints = dataPoints.sort((a, b) => a.date().differenceInDays(b.date()));

        /** @type {CalendarDate[]} */
        let allDates = [];
        let startDate = DateCreator.date(Month.JANUARY, 1, STARTING_YEAR);
        let endDate = DateCreator.now();
        for (let dateCursor = startDate; dateCursor.differenceInDays(endDate) <= 0; dateCursor = dateCursor.addDays(1)) {
            allDates.push(dateCursor);
        }

        /** @type {TimelineDataPoint[]} */
        let completeTimelineDataPoints = [];
        let lastValue = 0.0;

        let cursor = 0;
        for(let dataPoint of sortedPoints) {
            if(dataPoint.date().differenceInDays(startDate) < 0) {
                lastValue = dataPoint.value();
                cursor++;
                continue;
            }

            break;
        }

        for(let date of allDates) {
            if(cursor >= sortedPoints.length) {
                completeTimelineDataPoints.push(new TimelineDataPoint(date, lastValue));
                continue;
            }

            let existingDataPoint = sortedPoints[cursor];
            if(date.differenceInDays(existingDataPoint.date()) < 0) {
                completeTimelineDataPoints.push(new TimelineDataPoint(date, lastValue));
                continue;
            }

            if(date.differenceInDays(existingDataPoint.date()) === 0) {
                lastValue = existingDataPoint.value();
                completeTimelineDataPoints.push(existingDataPoint);
                cursor++;
                continue;
            }

            if(date.differenceInDays(existingDataPoint.date()) > 0) {
                completeTimelineDataPoints.push(new TimelineDataPoint(date, lastValue));
                continue;
            }
        }

        console.log(completeTimelineDataPoints);

        return completeTimelineDataPoints;
    }

    /** @param {number} value
     * @returns {number} */
    valuePercent = value => value > 0 ? ((value * 1.0) / this._max) : 0;

    /** @returns {number} */
    max = () => this._max;

    /** @returns {string} */
    name = () => this._name;

    /** @returns {TimelineDataPoint[]} */
    dataPoints = () => this._dataPoints;

    /** @returns {TimelineDataPoint} */
    dataPoint = position => this._dataPoints[position];
}

export {TimelineDataSet}
