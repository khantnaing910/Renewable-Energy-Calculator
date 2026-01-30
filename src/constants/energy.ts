export const CONSTANTS = {
  CO2_FACTOR: 0.42, // kg per kWh
  TREE_CO2_ABSORPTION: 21, // kg per year per tree
  AVG_HOME_CONSUMPTION: 10500, // kWh per year
  ELECTRICITY_PRICE: 0.15, // $ per kWh
  AIR_DENSITY: 1.225, // kg/m^3
  WATER_DENSITY: 1000, // kg/m^3
  GRAVITY: 9.81, // m/s^2
};

export const INITIAL_SOLAR: any = {
  panels: 12,
  panelWattage: 400,
  sunHours: 5.5,
  efficiency: 20,
  costPerPanel: 300,
};

export const INITIAL_WIND: any = {
  turbines: 1,
  rotorDiameter: 5,
  windSpeed: 6.5,
  efficiency: 35,
  costPerTurbine: 5000,
};

export const INITIAL_HYDRO: any = {
  flowRate: 15,
  head: 8,
  efficiency: 85,
  installationCost: 12000,
};
