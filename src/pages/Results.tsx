import { motion } from 'framer-motion';
import { Sprout, BarChart3, Clock, AlertCircle, RefreshCcw } from 'lucide-react';
import type { RecommendationResult } from '../logic/recommendationEngine';

interface ResultsProps {
    results: RecommendationResult[];
    onReset: () => void;
}

const Results = ({ results, onReset }: ResultsProps) => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-bold mb-4">Your Intelligent Report</h2>
                    <p className="opacity-60 max-w-lg">
                        We've found {results.length} crops that are ideal for your field conditions. Rank based on yield potential and soil compatibility.
                    </p>
                </div>
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2d5a27] text-[#2d5a27] font-semibold hover:bg-[#2d5a27] hover:text-white transition-all"
                >
                    <RefreshCcw size={18} /> New Analysis
                </button>
            </div>

            {results.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <AlertCircle size={48} className="mx-auto text-[#d4a373] mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Perfect Matches Found</h3>
                    <p className="opacity-60 mb-8">Try adjusting your soil type or irrigation assumptions.</p>
                    <button onClick={onReset} className="btn-primary mx-auto">Restart Advisor</button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results.map((res, index) => (
                        <motion.div
                            key={res.crop.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card overflow-hidden flex flex-col"
                        >
                            <div className="h-48 relative">
                                <img src={res.crop.image} alt={res.crop.name} className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-[#2d5a27]">
                                    {res.score}% Match
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold">{res.crop.name}</h3>
                                        <p className="text-xs italic opacity-40">{res.crop.scientificName}</p>
                                    </div>
                                    <Sprout className="text-[#2d5a27]" size={24} />
                                </div>

                                <p className="text-sm opacity-60 mb-6 flex-1">{res.crop.description}</p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Clock size={16} className="opacity-40" />
                                        <span><strong>Duration:</strong> {res.crop.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <BarChart3 size={16} className="opacity-40" />
                                        <div className="flex gap-2">
                                            {Object.entries(res.crop.nutrients).map(([k, v]) => (
                                                <span key={k} className="bg-[#fefae0] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                                                    {k}: {v as string}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5">
                                    {res.matchedFactors.map((f: string) => (
                                        <span key={f} className="text-[10px] uppercase tracking-wider font-bold text-[#2d5a27] bg-[#e9edc9] px-2 py-1 rounded">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Results;
