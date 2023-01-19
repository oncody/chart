class TimelineDataSet {
    /**
     * @param {string} name
     * @param {TimelineDataPoint[]} dataPoints
     * @returns {TimelineDataSet}
     */
    constructor(name, dataPoints) {
        this._name = name;
        this._dataPoints = dataPoints
            .filter(dataPoint => dataPoint.date().year() > 2018)
            .sort((a, b) => a.date().unix() - b.date().unix());
    }

    /**
     * @returns {string}
     */
    name() {
        return this._name;
    }

    /**
     * @returns {TimelineDataPoint[]}
     */
    dataPoints() {
        return this._dataPoints;
    }
}

export {TimelineDataSet}
