import { EnergyType, CalculationResults, SolarInputs, WindInputs, HydroInputs } from '../types/energy';
import { CONSTANTS } from '../constants/energy';

export const calculateResults = (type: EnergyType, inputs: any): CalculationResults => {
  let dailyOutput = 0;
  let totalCost = 0;

  if (type === 'solar') {
    const s = inputs as SolarInputs;
    dailyOutput = (s.panels * s.panelWattage * s.sunHours * (s.efficiency / 100)) / 1000;
    totalCost = s.panels * s.costPerPanel;
  } else if (type === 'wind') {
    const w = inputs as WindInputs;
    const sweptArea = Math.PI * Math.pow(w.rotorDiameter / 2, 2);
    const powerKw = (0.5 * CONSTANTS.AIR_DENSITY * sweptArea * Math.pow(w.windSpeed, 3) * (w.efficiency / 100)) / 1000;
    dailyOutput = powerKw * 24 * w.turbines;
    totalCost = w.turbines * w.costPerTurbine;
  } else if (type === 'hydro') {
    const h = inputs as HydroInputs;
    const powerKw = (CONSTANTS.WATER_DENSITY * CONSTANTS.GRAVITY * (h.flowRate / 1000) * h.head * (h.efficiency / 100)) / 1000;
    dailyOutput = powerKw * 24;
    totalCost = h.installationCost;
  }

  const yearlyOutput = dailyOutput * 365;
  const monthlyOutput = yearlyOutput / 12;
  const co2Saved = yearlyOutput * CONSTANTS.CO2_FACTOR;
  const moneySaved = yearlyOutput * CONSTANTS.ELECTRICITY_PRICE;
  const treesEquivalent = Math.round(co2Saved / CONSTANTS.TREE_CO2_ABSORPTION);
  const homesPowered = Number((yearlyOutput / CONSTANTS.AVG_HOME_CONSUMPTION).toFixed(2));
  
  const paybackPeriod = totalCost > 0 ? totalCost / moneySaved : 0;
  const roi = totalCost > 0 ? (moneySaved / totalCost) * 100 : 0;

  return {
    dailyOutput,
    monthlyOutput,
    yearlyOutput,
    co2Saved,
    moneySaved,
    treesEquivalent,
    homesPowered,
    paybackPeriod,
    roi
  };
};
