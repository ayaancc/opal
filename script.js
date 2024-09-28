document.addEventListener("DOMContentLoaded", function() {
    fetch('data.csv')
        .then(response => response.text())
        .then(csvText => {
            const dataLines = csvText.split('\n').slice(1); // Skip the header row
            const dates = [];
            const portfolioValues = [];
            const sp500Values = [];

            dataLines.forEach(line => {
                const [date, portfolio, sp500] = line.split(',');
                dates.push(date);
                portfolioValues.push(parseFloat(portfolio));
                sp500Values.push(parseFloat(sp500));
            });

            createChart(dates, portfolioValues, sp500Values);
        });
});

function createChart(dates, portfolioValues, sp500Values) {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Portfolio',
                    data: portfolioValues,
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'S&P 500',
                    data: sp500Values,
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    tension: 0.1,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        color: '#fff'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value',
                        color: '#fff'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}
