import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Wind, Droplets, Zap, TreeDeciduous, 
  Home, DollarSign, Leaf, Activity, Info, 
  ChevronRight, ArrowUpRight, ShieldCheck, TrendingUp
} from 'lucide-react';
import { EnergyType, SolarInputs, WindInputs, HydroInputs } from './types/energy';
import { INITIAL_SOLAR, INITIAL_WIND, INITIAL_HYDRO } from './constants/energy';
import { calculateResults } from './utils/calculations';
import { Card, Stat } from './components/ui/Layout';
import { Slider } from './components/ui/Slider';
import { ProductionChart } from './components/ui/Charts';
import { cn } from './utils/cn';

export function App() {
  const [activeType, setActiveType] = useState<EnergyType>('solar');
  const [solarInputs, setSolarInputs] = useState<SolarInputs>(INITIAL_SOLAR);
  const [windInputs, setWindInputs] = useState<WindInputs>(INITIAL_WIND);
  const [hydroInputs, setHydroInputs] = useState<HydroInputs>(INITIAL_HYDRO);

  const results = useMemo(() => {
    const inputs = activeType === 'solar' ? solarInputs : activeType === 'wind' ? windInputs : hydroInputs;
    return calculateResults(activeType, inputs);
  }, [activeType, solarInputs, windInputs, hydroInputs]);

  const chartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Simple seasonality simulation
    const seasonalFactor = {
      solar: [0.6, 0.8, 1.0, 1.2, 1.4, 1.5, 1.5, 1.4, 1.2, 0.9, 0.7, 0.5],
      wind: [1.4, 1.5, 1.3, 1.0, 0.8, 0.6, 0.5, 0.6, 0.8, 1.1, 1.3, 1.5],
      hydro: [1.5, 1.4, 1.2, 1.0, 0.8, 0.6, 0.5, 0.6, 0.8, 1.1, 1.3, 1.5],
    };

    return months.map((month, i) => ({
      name: month,
      kWh: Math.round(results.monthlyOutput * seasonalFactor[activeType][i])
    }));
  }, [results.monthlyOutput, activeType]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-100/40 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-100/40 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 border-b border-slate-200/60 bg-white/60 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-xl text-white">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight">EcoPulse</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="text-emerald-600 border-b-2 border-emerald-600 pb-1">Calculator</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Insights</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Solutions</a>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 text-xs">
              Contact Expert
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Configuration */}
          <div className="lg:col-span-4 space-y-6">
            <section>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Select Source</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'solar', icon: Sun, label: 'Solar', color: 'bg-amber-500', light: 'bg-amber-50' },
                  { id: 'wind', icon: Wind, label: 'Wind', color: 'bg-blue-500', light: 'bg-blue-50' },
                  { id: 'hydro', icon: Droplets, label: 'Hydro', color: 'bg-cyan-500', light: 'bg-cyan-50' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id as EnergyType)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl transition-all border-2",
                      activeType === type.id 
                        ? "border-emerald-500 bg-white shadow-xl shadow-emerald-100/50 scale-[1.02]" 
                        : "border-transparent bg-slate-100 hover:bg-slate-200 text-slate-500"
                    )}
                  >
                    <type.icon size={24} className={cn("mb-2", activeType === type.id ? "text-emerald-600" : "")} />
                    <span className="text-xs font-bold uppercase tracking-tight">{type.label}</span>
                  </button>
                ))}
              </div>
            </section>

            <Card title="Configuration" subtitle={`Adjust parameters for your ${activeType} setup`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeType}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {activeType === 'solar' && (
                    <>
                      <Slider label="Solar Panels" icon={<Zap size={14} />} value={solarInputs.panels} min={1} max={100} onChange={v => setSolarInputs(s => ({...s, panels: v}))} unit=" pcs" />
                      <Slider label="Panel Capacity" icon={<Zap size={14} />} value={solarInputs.panelWattage} min={100} max={600} step={10} onChange={v => setSolarInputs(s => ({...s, panelWattage: v}))} unit=" W" />
                      <Slider label="Sun Hours" icon={<Sun size={14} />} value={solarInputs.sunHours} min={1} max={12} step={0.1} onChange={v => setSolarInputs(s => ({...s, sunHours: v}))} unit=" h/d" />
                      <Slider label="Cost per Panel" icon={<DollarSign size={14} />} value={solarInputs.costPerPanel} min={100} max={1000} step={10} onChange={v => setSolarInputs(s => ({...s, costPerPanel: v}))} unit=" $" />
                    </>
                  )}
                  {activeType === 'wind' && (
                    <>
                      <Slider label="Turbines" icon={<Wind size={14} />} value={windInputs.turbines} min={1} max={20} onChange={v => setWindInputs(w => ({...w, turbines: v}))} unit=" units" />
                      <Slider label="Rotor Diameter" icon={<Activity size={14} />} value={windInputs.rotorDiameter} min={1} max={30} step={0.5} onChange={v => setWindInputs(w => ({...w, rotorDiameter: v}))} unit=" m" />
                      <Slider label="Avg Wind Speed" icon={<TrendingUp size={14} />} value={windInputs.windSpeed} min={1} max={25} step={0.5} onChange={v => setWindInputs(w => ({...w, windSpeed: v}))} unit=" m/s" />
                      <Slider label="Cost per unit" icon={<DollarSign size={14} />} value={windInputs.costPerTurbine} min={1000} max={20000} step={100} onChange={v => setWindInputs(w => ({...w, costPerTurbine: v}))} unit=" $" />
                    </>
                  )}
                  {activeType === 'hydro' && (
                    <>
                      <Slider label="Flow Rate" icon={<Droplets size={14} />} value={hydroInputs.flowRate} min={1} max={500} onChange={v => setHydroInputs(h => ({...h, flowRate: v}))} unit=" L/s" />
                      <Slider label="Head Height" icon={<TrendingUp size={14} />} value={hydroInputs.head} min={1} max={100} step={1} onChange={v => setHydroInputs(h => ({...h, head: v}))} unit=" m" />
                      <Slider label="System Efficiency" icon={<ShieldCheck size={14} />} value={hydroInputs.efficiency} min={50} max={98} step={1} onChange={v => setHydroInputs(h => ({...h, efficiency: v}))} unit=" %" />
                      <Slider label="Installation Cost" icon={<DollarSign size={14} />} value={hydroInputs.installationCost} min={2000} max={50000} step={500} onChange={v => setHydroInputs(h => ({...h, installationCost: v}))} unit=" $" />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </Card>

            <div className="bg-emerald-900 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Leaf size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                  <ShieldCheck className="text-emerald-400" />
                  Expert Tip
                </h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed mb-4">
                  Did you know that regular maintenance of {activeType} systems can increase efficiency by up to 15%? Consider annual checkups.
                </p>
                <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors">
                  Learn More <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Results & Analytics */}
          <div className="lg:col-span-8 space-y-6">
            {/* Location Banner */}
            <div className="bg-white border border-slate-200 rounded-3xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Current Simulation</p>
                  <p className="text-sm font-bold text-slate-700">Optimal Location: High Latitude Coastal (Sample Data)</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-700 uppercase">Live Analysis</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Stat label="Daily Output" value={`${results.dailyOutput.toFixed(1)} kWh`} icon={<Zap size={18} />} color="bg-amber-500" />
              <Stat label="Annual Savings" value={`$${Math.round(results.moneySaved).toLocaleString()}`} icon={<DollarSign size={18} />} color="bg-emerald-500" />
              <Stat label="CO₂ Reduced" value={`${(results.co2Saved / 1000).toFixed(1)} Tons`} icon={<Leaf size={18} />} color="bg-green-600" />
              <Stat label="ROI Rate" value={`${results.roi.toFixed(1)}%`} icon={<TrendingUp size={18} />} color="bg-blue-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Production Forecast" subtitle="Estimated energy generation throughout the year (kWh)">
                <ProductionChart data={chartData} />
              </Card>

              <div className="space-y-6">
                <Card title="Environmental Impact" subtitle="Positive contribution to the planet">
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white mb-3 shadow-lg shadow-emerald-200">
                        <TreeDeciduous size={24} />
                      </div>
                      <span className="text-2xl font-black text-emerald-900">{results.treesEquivalent}</span>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tight">Trees Equivalent</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-200">
                        <Home size={24} />
                      </div>
                      <span className="text-2xl font-black text-blue-900">{results.homesPowered}</span>
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-tight">Homes Powered</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <TrendingUp size={64} />
                    </div>
                    <div className="relative z-10 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Payback Period</p>
                        <h4 className="text-2xl font-black">{results.paybackPeriod.toFixed(1)} Years</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Yield</p>
                        <h4 className="text-xl font-bold">{(results.yearlyOutput * 25 / 1000).toFixed(1)} MWh</h4>
                        <p className="text-[10px] text-slate-500">Projected 25-Year Life</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card title="System Efficiency" subtitle="Current performance compared to peak potential">
                  <div className="space-y-4 mt-2">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                        <span>Utilization</span>
                        <span className="text-emerald-600">{Math.round((results.yearlyOutput / 15000) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((results.yearlyOutput / 15000) * 100, 100)}%` }}
                          className="h-full bg-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 items-start bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                      <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed text-blue-700 font-medium">
                        Calculations are based on average regional data. For a precise quote and technical audit, connect with our installation partners.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-white border border-slate-200 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                Download PDF Report <ArrowUpRight size={18} />
              </button>
              <button className="flex-1 bg-emerald-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                Talk to Installation Expert <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-12 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-slate-200 p-2 rounded-xl text-slate-600">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-400">EcoPulse</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Service</a>
            <a href="#" className="hover:text-slate-900">Methodology</a>
          </div>
          <p className="text-sm text-slate-400">© 2026 EcoPulse Energy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
