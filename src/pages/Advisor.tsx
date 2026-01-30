import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Thermometer, Info, Check } from 'lucide-react';
import MapSelector from '../components/MapSelector';

interface AdvisorProps {
    onCalculate: (data: any) => void;
}

const Advisor = ({ onCalculate }: AdvisorProps) => {
    const [formData, setFormData] = useState({
        location: { lat: 0, lng: 0 },
        season: 'Kharif',
        soilType: 'Alluvial',
        rainfall: 1200,
        temperature: 28,
    });

    const [step, setStep] = useState(1);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onCalculate(formData);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Crop Advisor Engine</h2>
                <p className="opacity-60">Fill in your field details for a personalized recommendation.</p>
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                {/* Progress sidebar */}
                <div className="space-y-4">
                    {[
                        { id: 1, label: 'Location' },
                        { id: 2, label: 'Environment' },
                        { id: 3, label: 'Soil Details' }
                    ].map((s) => (
                        <div
                            key={s.id}
                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${step === s.id ? 'bg-[#2d5a27] text-white' : 'glass-card opacity-60'
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === s.id ? 'bg-white text-[#2d5a27]' : 'bg-[#2d5a27] text-white'
                                }`}>
                                {step > s.id ? <Check size={16} /> : s.id}
                            </div>
                            <span className="font-semibold">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Form content */}
                <div className="glass-card p-8 min-h-[500px] flex flex-col">
                    <form onSubmit={handleSubmit} className="flex-1">
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <h3 className="text-xl font-bold">Where is your field located?</h3>
                                <MapSelector onLocationSelect={(lat, lng) => setFormData({ ...formData, location: { lat, lng } })} />
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="btn-primary w-full justify-center py-4"
                                    disabled={formData.location.lat === 0}
                                >
                                    Continue to Environment
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div>
                                    <label className="block text-sm font-semibold opacity-60 mb-4 flex items-center gap-2">
                                        <CloudRain size={16} /> Annual Rainfall (mm)
                                    </label>
                                    <input
                                        type="range"
                                        min="200"
                                        max="3000"
                                        value={formData.rainfall}
                                        onChange={(e) => setFormData({ ...formData, rainfall: parseInt(e.target.value) })}
                                        className="w-full accent-[#2d5a27]"
                                    />
                                    <div className="flex justify-between text-sm mt-2 font-bold">
                                        <span>200mm</span>
                                        <span className="bg-[#e9edc9] px-3 py-1 rounded-lg">{formData.rainfall} mm</span>
                                        <span>3000mm</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold opacity-60 mb-4 flex items-center gap-2">
                                        <Thermometer size={16} /> Average Temperature (°C)
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="50"
                                        value={formData.temperature}
                                        onChange={(e) => setFormData({ ...formData, temperature: parseInt(e.target.value) })}
                                        className="w-full accent-[#d4a373]"
                                    />
                                    <div className="flex justify-between text-sm mt-2 font-bold">
                                        <span>5°C</span>
                                        <span className="bg-[#fefae0] px-3 py-1 rounded-lg">{formData.temperature} °C</span>
                                        <span>50°C</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 font-semibold opacity-40 hover:opacity-100 transition-opacity">Back</button>
                                    <button type="button" onClick={() => setStep(3)} className="btn-primary flex-1 justify-center py-4">Next Step</button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold opacity-60 mb-2">Current Season</label>
                                        <select
                                            value={formData.season}
                                            onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                                            className="w-full p-4 rounded-xl border-none glass-card focus:ring-2 ring-[#2d5a27] outline-none"
                                        >
                                            <option>Kharif</option>
                                            <option>Rabi</option>
                                            <option>Zaid</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold opacity-60 mb-2">Soil Type</label>
                                        <select
                                            value={formData.soilType}
                                            onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                                            className="w-full p-4 rounded-xl border-none glass-card focus:ring-2 ring-[#2d5a27] outline-none"
                                        >
                                            <option>Alluvial</option>
                                            <option>Black</option>
                                            <option>Red</option>
                                            <option>Laterite</option>
                                            <option>Arid</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-[#e9edc9] text-[#2d5a27] flex gap-4 items-start">
                                    <Info className="shrink-0 mt-1" size={20} />
                                    <p className="text-sm">
                                        Based on your selections, we will analyze nutrient requirements (NPK) and match them with seasonal yields.
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 font-semibold opacity-40 hover:opacity-100 transition-opacity">Back</button>
                                    <button type="submit" className="btn-primary flex-1 justify-center py-4">Generate Report</button>
                                </div>
                            </motion.div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Advisor;
