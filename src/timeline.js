import { Chart as ChartJS, ArcElement, Tooltip, LinearScale } from 'chart.js';
import {Colors} from "./colors.js"
import {Numbers} from "@oncody/objects";

class Timeline {
    /** The x-axis is meant to be time
     * @param {string} htmlId
     * @param {TimelineDataSet[]} timelineDataSets */
    constructor(htmlId, timelineDataSets) {
        /** @private */ this._htmlId = htmlId;
        /** @private */ this._dataSets = timelineDataSets;
        /** @private */ this._colors = new Colors();

        let labels = this.createXAxisYearLabels();
        let chartDataSets = this.createChartDataSets();
        this.createChart(chartDataSets, labels);
    }

    /** Create the X axis year labels
     * @return {string []} */
    createXAxisYearLabels = () => {
        let yearsPrinted = [];

        return this._dataSets[0].dataPoints().map(dataPoint => {
            let year = dataPoint.date().year();
            if(yearsPrinted.includes(year)) {
                return '';
            }

            yearsPrinted.push(year);
            return year;
        });
    }

    /** @return {[]} */
    createChartDataSets = () => {
        return this._dataSets.map(dataSet => {
            let color = this._colors.nextColor();
            return {
                label: dataSet.name(),
                data: dataSet.dataPoints().map(dataPoint => dataSet.valuePercent(dataPoint.value())),
                pointRadius: 0,
                borderWidth: 1,
                backgroundColor: color,
                borderColor: color,
                // tension: 0.4,
                // cubicInterpolationMode: 'monotone',
            };
        });
    }

    /** @param {[]} data
     * @param {[]} labels */
    createChart = (data, labels) => {
        ChartJS.register(ArcElement, Tooltip, LinearScale);
        Chart.Tooltip.positioners.cursor = function(chartElements, coordinates) {
            return coordinates;
        };

        /** @param {[]} charts
         * @return {string} */
        let tooltipTitleCallback = (charts) => {
            if(!charts || !charts.length) {
                return '';
            }

            let firstChart = charts[0];
            if(!firstChart) {
                return '';
            }

            let index = firstChart.dataIndex;
            if(!this._dataSets || !this._dataSets.length) {
                return '';
            }

            let dataSet = this._dataSets[0];
            let dataPoint = dataSet.dataPoint(index);
            if(!dataPoint) {
                return '';
            }

            return dataPoint.date().longHumanString();
        };

        /** @param {Object} chart
         * @return {string} */
        let tooltipLabelCallback = (chart) => {
            let label = chart.dataset.label;
            let index = chart.dataIndex;
            let dataSet = this._dataSets.find(dataSet => dataSet.name() === label);
            let dataPoint = dataSet.dataPoint(index);
            let name = dataSet.name();
            let valuePercent = Numbers.roundFloat(dataSet.valuePercent(dataPoint.value()), 2);
            let value = Numbers.roundFloat(dataPoint.value(), 2);
            return `${name}:   ${valuePercent}%    $${value}`
        }

        const htmlElement = document.getElementById(this._htmlId);
        new Chart(htmlElement, {
            type: 'line',
            data: {
                datasets: data,
                labels: labels,
            },
            options: {
                plugins: {
                    tooltip: {
                        displayColors: false,
                        callbacks: {
                            title: tooltipTitleCallback,
                            label: tooltipLabelCallback,
                        },
                    },
                },
                interaction: {
                    position: 'cursor',
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        border: {
                            display: false,
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0,
                            autoSkip: false,
                        },
                    },
                    y: {
                        suggestedMin: 0,
                        suggestedMax: 1,
                        border: {
                            display: false,
                        },
                        offset: true,
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0,
                            autoSkip: false,
                            stepSize: .1,
                        },
                    }
                }
            }
        });
    }
}

export {Timeline}
