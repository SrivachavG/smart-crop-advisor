import { motion } from 'framer-motion';
import { ChevronRight, Sprout, Database } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

const Landing = ({ onStart }: LandingProps) => {
    return (
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="inline-block px-4 py-1 rounded-full bg-[#e9edc9] text-[#2d5a27] font-semibold text-sm mb-6">
                    AI-POWERED AGRICULTURE
                </span>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Smarter Crops, <br />
                    <span className="text-opacity-60 text-black">Higher Yields.</span>
                </h1>
                <p className="text-lg opacity-80 mb-10 max-w-lg leading-relaxed">
                    AgroPulse uses advanced geospatial intelligence and soil data to recommend the perfect crops for your land. Optimize your harvest with Precision Ag.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onStart}
                        className="btn-primary text-lg px-10 py-4"
                    >
                        Start Advisor <ChevronRight size={20} />
                    </button>
                    <button className="flex items-center gap-2 px-10 py-4 font-semibold opacity-60 hover:opacity-100 transition-opacity">
                        Watch Tutorial
                    </button>
                </div>

                <div className="mt-16 grid grid-cols-3 gap-8">
                    <div>
                        <div className="font-bold text-2xl text-[#2d5a27]">20+</div>
                        <div className="text-xs uppercase tracking-wider opacity-60">Crop Varieties</div>
                    </div>
                    <div>
                        <div className="font-bold text-2xl text-[#2d5a27]">98%</div>
                        <div className="text-xs uppercase tracking-wider opacity-60">Accuracy</div>
                    </div>
                    <div>
                        <div className="font-bold text-2xl text-[#2d5a27]">5k+</div>
                        <div className="text-xs uppercase tracking-wider opacity-60">Farmers Trusted</div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
            >
                <div className="glass-card p-4 aspect-square flex items-center justify-center overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000"
                        alt="Agriculture Technology"
                        className="w-full h-full object-cover rounded-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    />
                </div>

                <div className="absolute -top-6 -right-6 p-6 glass-card fade-in">
                    <Sprout className="text-[#2d5a27]" size={32} />
                </div>
                <div className="absolute -bottom-6 -left-6 p-6 glass-card fade-in" style={{ animationDelay: '0.4s' }}>
                    <Database className="text-[#d4a373]" size={32} />
                </div>
            </motion.div>
        </div>
    );
};

export default Landing;
