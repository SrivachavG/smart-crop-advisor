import { useState } from 'react';
import { Sprout } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// components
import Landing from './pages/Landing';
import Advisor from './pages/Advisor';
import Results from './pages/Results';
import { getRecommendations } from './logic/recommendationEngine';
import type { RecommendationResult } from './logic/recommendationEngine';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'advisor' | 'results'>('landing');
  const [results, setResults] = useState<RecommendationResult[]>([]);

  const handleCalculate = (data: any) => {
    const findings = getRecommendations(data);
    setResults(findings);
    setCurrentPage('results');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="organic-shape shape-1" />
      <div className="organic-shape shape-2" />

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto z-10 relative">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('landing')}>
          <div className="bg-[#2d5a27] p-2 rounded-xl">
            <Sprout className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl text-[#2d5a27]">AgroPulse</span>
        </div>

        <div className="hidden md:flex gap-8 font-medium">
          <a href="#" className="text-[#2d5a27]">How it works</a>
          <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Solutions</a>
          <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">Contact</a>
        </div>

        <button
          className="btn-primary"
          onClick={() => setCurrentPage('advisor')}
        >
          Get Started
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 z-10 relative">
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <Landing key="landing" onStart={() => setCurrentPage('advisor')} />
          )}
          {currentPage === 'advisor' && (
            <Advisor key="advisor" onCalculate={handleCalculate} />
          )}
          {currentPage === 'results' && (
            <Results key="results" results={results} onReset={() => setCurrentPage('advisor')} />
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 px-6 text-center opacity-40 text-sm">
        © 2026 AgroPulse Intelligent Systems. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
