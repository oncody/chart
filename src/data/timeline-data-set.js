class TimelineDataSet {
    /** @param {string} name
     * @param {TimelineDataPoint[]} dataPoints
     * @returns {TimelineDataSet} */
    constructor(name, dataPoints) {
        /** @private */ this._name = name;
        /** @private */ this._dataPoints = dataPoints
            .filter(dataPoint => dataPoint.date().year() > 2018)
            .sort((a, b) => a.date().differenceInDays(b.date()));
    }

    /** @returns {string} */
    name = () => this._name;

    /** @returns {TimelineDataPoint[]} */
    dataPoints = () => this._dataPoints;
}

export {TimelineDataSet}
