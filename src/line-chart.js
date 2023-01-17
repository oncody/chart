import { Chart as ChartJS, ArcElement, Tooltip, LinearScale } from 'chart.js';
import {Colors} from "./colors.js"

class LineChart {
    /**
     * @param {{}} data - keys are stock name. value is array of data
     * @param {string} htmlId
     * @param {string} valueField
     * @param {string} labelField
     * @param {string} tooltipTitleField
     * @param {string} tooltipLabelField
     */
    constructor(data, htmlId, valueField, labelField, tooltipTitleField, tooltipLabelField) {
        this._data = data;
        this._htmlId = htmlId;
        this._valueField = valueField;
        this._labelField = labelField;
        this._tooltipTitleField = tooltipTitleField;
        this._tooltipLabelField = tooltipLabelField;
        this._colors = new Colors();

        let labels = this.createLabels();
        let normalizedData = this.normalizeData();
        this.createChart(normalizedData, labels);
    }

    /**
     * @return {[]}
     */
    createLabels() {
        let yearsPrinted = [];

        return Object.values(this._data)[0].map(record => {
            if(yearsPrinted.includes(record[this._labelField])) {
                return '';
            }
            yearsPrinted.push(record[this._labelField]);
            return record.year;
        });
    }

    /**
     * @return {[]}
     */
    normalizeData() {
        return Object.entries(this._data).map(entry => {
            let stock = entry[0];
            let data = entry[1];
            let color = this._colors.randomColor();
            return {
                label: stock,
                data: data.map(record => record[this._valueField]),
                lineTension: 0.8,
                tension: 0.8,
                pointRadius: 0,
                borderWidth: 1,
                cubicInterpolationMode: 'monotone',
                backgroundColor: color,
                borderColor: color,
            };
        });
    }

    /**
     * @param {[]} data
     * @param {[]} labels
     */
    createChart(data, labels) {
        ChartJS.register(ArcElement, Tooltip, LinearScale);
        Chart.Tooltip.positioners.cursor = function(chartElements, coordinates) {
            return coordinates;
        };

        /**
         * @param {[]} charts
         * @return {string}
         */
        let tooltipTitleCallback = (charts) => {
            let firstChart = charts[0];
            let index = firstChart.dataIndex;
            return Object.values(this._data)[0][index][this._tooltipTitleField];
        };

        /**
         * @param {Object} chart
         * @return {string}
         */
        let tooltipLabelCallback = (chart) => {
            let label = chart.dataset.label;
            let index = chart.dataIndex;
            return this._data[label][index][this._tooltipLabelField];
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

export {LineChart}
