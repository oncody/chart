import { Chart as ChartJS, ArcElement, Tooltip, LinearScale } from 'chart.js';

class LineChart {
    /**
     *
     * @param {string} htmlId
     * @param {[]} data
     * @param {[]} labels
     * @param {function} titleCallback
     * @param {function} labelCallback
     */
    constructor(htmlId, data, labels, titleCallback, labelCallback) {
        ChartJS.register(ArcElement, Tooltip, LinearScale);

        Chart.Tooltip.positioners.cursor = function(chartElements, coordinates) {
            return coordinates;
        };

        const ctx = document.getElementById(htmlId);
        new Chart(ctx, {
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
                            title: titleCallback,
                            label: labelCallback,
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
