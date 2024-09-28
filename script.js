document.addEventListener("DOMContentLoaded", function() {
    const dataMap = {
        "all-time": {
            portfolio: 11.5,
            sp500: 5.01,
            startDate: "July 1, 2024"
        },
        "1-month": {
            portfolio: 4.69,
            sp500: 2.35
        },
        "1-week": {
            portfolio: 3.76,
            sp500: 0.57
        }
    };

    // Set the default display to "All-Time"
    updateDisplay('all-time', dataMap);

    // Handle the dropdown selector
    const selector = document.getElementById('timeframe-selector');
    selector.addEventListener('change', function() {
        const selectedTimeframe = this.value;
        updateDisplay(selectedTimeframe, dataMap);
    });
});

// Function to update the display based on the selected timeframe
function updateDisplay(timeframe, dataMap) {
    const portfolioReturn = dataMap[timeframe].portfolio.toFixed(2);
    const sp500Return = dataMap[timeframe].sp500.toFixed(2);

    let displayText = `<h3>Timeframe: ${timeframe === 'all-time' ? 'All-Time (Since July 1, 2024)' : timeframe.replace('-', ' ')}</h3>`;
    displayText += `<p>Your Portfolio Return: ${portfolioReturn}%</p>`;
    displayText += `<p>S&P 500 Return: ${sp500Return}%</p>`;

    const returnDisplay = document.getElementById('comparison-display');
    returnDisplay.innerHTML = displayText;
}
