function calculateSolarEnergy() {
    const numPanels = parseInt(document.getElementById('numPanels').value);
    const panelWattage = parseFloat(document.getElementById('panelWattage').value);
    const panelArea = parseFloat(document.getElementById('panelArea').value);
    const areaUnit = document.getElementById('areaUnit').value;
    const efficiency = parseFloat(document.getElementById('efficiency').value) / 100;

    let areaInM2 = areaUnit === "ft²" ? panelArea * 0.092903 : panelArea;

    const sunlightHoursRange = Array.from({ length: 12 }, (_, i) => i + 1);
    const dailyEnergyOutputs = sunlightHoursRange.map(sunlightHours => {
        return numPanels * panelWattage * sunlightHours * efficiency;
    });

    document.getElementById('solarResult').innerText = `Daily Energy Output for 12 hours: ${dailyEnergyOutputs[11].toFixed(2)} kWh`;
    plotSolarEnergy(sunlightHoursRange, dailyEnergyOutputs);
}

function plotSolarEnergy(sunlightHours, energyOutputs) {
    const ctx = document.getElementById('solarChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sunlightHours,
            datasets: [
                {
                    label: 'Energy Output (kWh)',
                    data: energyOutputs,
                    borderColor: 'blue',
                    fill: false,
                    tension: 0.1 // Optional: smooth the line
                },

            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Solar Energy Output (We assumed 100% efficiency.)',
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Sunlight Hours (hours)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Energy Output (kWh)',
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function calculateWindEnergy() {
    const numTurbines = parseInt(document.getElementById('numTurbines').value);
    const avgWindSpeed = parseFloat(document.getElementById('windSpeed').value);
    const turbineCapacity = parseFloat(document.getElementById('turbineCapacity').value);

    let efficiencyFactor;
    if (avgWindSpeed < 3) {
        efficiencyFactor = 0.0;
    } else if (avgWindSpeed < 5) {
        efficiencyFactor = 0.1;
    } else if (avgWindSpeed < 8) {
        efficiencyFactor = 0.25;
    } else if (avgWindSpeed < 12) {
        efficiencyFactor = 0.4;
    } else {
        efficiencyFactor = 0.5;
    }

    const dailyEnergyOutput = numTurbines * turbineCapacity * efficiencyFactor * 24;
    document.getElementById('windResult').innerText = `Daily Energy Output: ${dailyEnergyOutput.toFixed(2)} kWh`;
    plotWindEnergy(dailyEnergyOutput);
}

function plotWindEnergy(energyOutput) {
    const ctx = document.getElementById('windChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Wind Energy'],
            datasets: [{
                label: 'Energy Output (kWh)',
                data: [energyOutput],
                backgroundColor: 'green'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Wind Energy Output',
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Energy Output (kWh)',
                    },
 beginAtZero: true
                }
            }
        }
    });
}