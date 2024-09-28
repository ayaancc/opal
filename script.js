document.addEventListener("DOMContentLoaded", function() {
    fetch('data.csv')
        .then(response => response.text())
        .then(csvText => {
            const dataLines = csvText.split('\n').slice(1); // Skip the header row
            const dates = [];
            const portfolioValues = [];
            const sp500Values = [];
            let latestTickers = [], latestWeights = [], entryPrices = [], currentPrices = [];

            dataLines.forEach(line => {
                const [date, portfolio, sp500, tickers, weights, entries, currents] = line.split(',');

                // Parsing data for each line
                dates.push(date);
                portfolioValues.push(parseFloat(portfolio));
                sp500Values.push(parseFloat(sp500));

                if (line === dataLines[dataLines.length - 1]) { // Get the latest date data
                    latestTickers = tickers.replace(/"/g, '').split(' ');
                    latestWeights = weights.replace(/"/g, '').split(' ').map(w => parseFloat(w));
                    entryPrices = entries.replace(/"/g, '').split(' ').map(p => parseFloat(p));
                    currentPrices = currents.replace(/"/g, '').split(' ').map(p => parseFloat(p));
                }
            });

            createChart(dates, portfolioValues, sp500Values);
            createHoldingsChart(latestTickers, latestWeights, entryPrices, currentPrices);
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

function createHoldingsChart(tickers, weights, entryPrices, currentPrices) {
    const chartContainer = document.createElement('div');
    chartContainer.id = 'holdings-chart';
    document.getElementById('container').appendChild(chartContainer);

    tickers.forEach((ticker, index) => {
        const div = document.createElement('div');
        div.className = 'holding';
        div.style.flex = weights[index];
        
        const returnSinceBuy = ((currentPrices[index] - entryPrices[index]) / entryPrices[index]) * 100;
        div.style.backgroundColor = returnSinceBuy > 0 
            ? `rgba(0, 255, 0, ${Math.min(1, returnSinceBuy / 100)})`
            : `rgba(255, 0, 0, ${Math.min(1, Math.abs(returnSinceBuy) / 100)})`;
        
        div.innerHTML = `<div>${ticker}<br>${returnSinceBuy.toFixed(2)}%</div>`;
        
        chartContainer.appendChild(div);
    });
}
