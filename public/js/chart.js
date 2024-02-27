const fetchData = async (interval) => {
    // Simulating an asynchronous operation (replace with your actual data fetching logic)
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = {
                day: [
                    { hour: '00:00', consumption: 10 },
                    { hour: '01:00', consumption: 15 },
                    { hour: '02:00', consumption: 8 },
                    { hour: '03:00', consumption: 12 },
                    { hour: '04:00', consumption: 16 },
                    { hour: '05:00', consumption: 10 },
                    { hour: '06:00', consumption: 14 },
                    { hour: '07:00', consumption: 20 },
                    { hour: '08:00', consumption: 18 },
                    { hour: '09:00', consumption: 22 },
                    { hour: '10:00', consumption: 24 },
                    { hour: '11:00', consumption: 20 },
                    { hour: '12:00', consumption: 25 },
                    { hour: '13:00', consumption: 28 },
                    { hour: '14:00', consumption: 30 },
                    { hour: '15:00', consumption: 25 },
                    { hour: '16:00', consumption: 22 },
                    { hour: '17:00', consumption: 18 },
                    { hour: '18:00', consumption: 20 },
                    { hour: '19:00', consumption: 16 },
                    { hour: '20:00', consumption: 14 },
                    { hour: '21:00', consumption: 12 },
                    { hour: '22:00', consumption: 10 },
                    { hour: '23:00', consumption: 8 }
                ],
                week: [
                    { day: 'Mon', consumption: 80 },
                    { day: 'Tue', consumption: 90 },
                    { day: 'Wed', consumption: 85 },
                    { day: 'Thu', consumption: 95 },
                    { day: 'Fri', consumption: 100 },
                    { day: 'Sat', consumption: 110 },
                    { day: 'Sun', consumption: 95 }
                ],
                month: [
                    { month: 'Jan', consumption: 500 },
                    { month: 'Feb', consumption: 520 },
                    { month: 'Mar', consumption: 480 },
                    { month: 'Apr', consumption: 550 },
                    { month: 'May', consumption: 540 },
                    { month: 'Jun', consumption: 580 },
                    { month: 'Jul', consumption: 600 },
                    { month: 'Aug', consumption: 620 },
                    { month: 'Sep', consumption: 580 },
                    { month: 'Oct', consumption: 560 },
                    { month: 'Nov', consumption: 540 },
                    { month: 'Dec', consumption: 530 }
                ],
                year: [
                    { year: 2019, consumption: 6500 },
                    { year: 2020, consumption: 6800 },
                    { year: 2021, consumption: 6300 },
                    { year: 2022, consumption: 7000 },
                    { year: 2023, consumption: 7200 }
                ]
            };
            resolve(data[interval]);
        }, 1000);
    });
};

window.addEventListener('DOMContentLoaded', async () => {
    let currentInterval = 'day'; // Default interval
    let chart;

    const updateChart = async () => {
        try {
            const chartData = await fetchData(currentInterval);

            if (!chartData || chartData.length === 0) {
                console.error(`No data available for interval: ${currentInterval}`);
                return;
            }

            let labels, values, xaxisTitle;

            if (currentInterval === 'day') {
                labels = chartData.map(item => item.hour);
                values = chartData.map(item => item.consumption);
                xaxisTitle = 'Hour';
            } else if (currentInterval === 'week') {
                labels = chartData.map(item => item.day);
                values = chartData.map(item => item.consumption);
                xaxisTitle = 'Day';
            } else if (currentInterval === 'month') {
                labels = chartData.map(item => item.month);
                values = chartData.map(item => item.consumption);
                xaxisTitle = 'Month';
            } else if (currentInterval === 'year') {
                labels = chartData.map(item => item.year);
                values = chartData.map(item => item.consumption);
                xaxisTitle = 'Year';
            }

            if (chart) {
                chart.updateOptions({
                    xaxis: {
                        categories: labels,
                        title: {
                            text: xaxisTitle
                        }
                    },
                    series: [{ data: values }]
                });
            } else {
                chart = new ApexCharts(document.getElementById('chartContainer'), {
                    chart: {
                        type: 'bar',
                        height: 400
                    },
                    series: [{ data: values }],
                    xaxis: {
                        categories: labels,
                        title: {
                            text: xaxisTitle
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Consumption'
                        }
                    }
                });
                chart.render();
            }

            // Display the selected interval on the chart
            intervalLabel.textContent = `Selected Interval: ${currentInterval}`;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const buttons = document.querySelectorAll('.btn-group button');
    const intervalLabel = document.getElementById('intervalLabel');

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const clickedInterval = button.getAttribute('data-interval');

            if (currentInterval !== clickedInterval) {
                currentInterval = clickedInterval;
                await updateChart();
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
        });
    });

    await updateChart(); // Initial chart update
});
