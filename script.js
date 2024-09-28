document.addEventListener("DOMContentLoaded", function() {
    fetch('data.csv')
        .then(response => response.text())
        .then(csvText => {
            const dataLines = csvText.split('\n').slice(1); // Skip the header row
            const dataMap = {};

            // Parse the CSV data
            dataLines.forEach(line => {
                if (line.trim() === "") return; // Skip empty lines
                const [timeframe, portfolio, sp500] = line.split(',');

                dataMap[timeframe.trim()] = {
                    portfolio: parseFloat(portfolio.trim()),
                    sp500: parseFloat(sp500.trim())
                };
            });

            // Default to showing 'Total' returns
            updateDisplay('Total', dataMap);

            // Handle the dropdown selector
            const selector = document.getElementById('timeframe-selector');
            selector.addEventListener('change', function() {
                const selectedTimeframe = this.value;
                updateDisplay(selectedTimeframe, dataMap);
            });
        });
});

// Function to update the display based on the selected timeframe
function updateDisplay(timeframe, dataMap) {
    const portfolioReturn = dataMap[timeframe].portfolio.toFixed(2);
    const sp500Return = dataMap[timeframe].sp500.toFixed(2);

    const returnDisplay = document.getElementById('comparison-display');
    returnDisplay.innerHTML = `<h3>Timeframe: ${timeframe}</h3>
                               <p>Your Portfolio Return: ${portfolioReturn}%</p>
                               <p>S&P 500 Return: ${sp500Return}%</p>`;
}
