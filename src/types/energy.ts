export type EnergyType = 'solar' | 'wind' | 'hydro';

export interface CalculationResults {
  dailyOutput: number;
  monthlyOutput: number;
  yearlyOutput: number;
  co2Saved: number;
  moneySaved: number;
  treesEquivalent: number;
  homesPowered: number;
  paybackPeriod: number;
  roi: number;
}

export interface SolarInputs {
  panels: number;
  panelWattage: number;
  sunHours: number;
  efficiency: number;
  costPerPanel: number;
}

export interface WindInputs {
  turbines: number;
  rotorDiameter: number;
  windSpeed: number;
  efficiency: number;
  costPerTurbine: number;
}

export interface HydroInputs {
  flowRate: number;
  head: number;
  efficiency: number;
  installationCost: number;
}

export type AnyInputs = SolarInputs | WindInputs | HydroInputs;
