import React from 'react';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { HeroVideoSection } from './HeroVideoSection';
import { ProblemSection } from './ProblemSection';
import { SolutionSection } from './SolutionSection';
import { SmartImportHeroSection } from './SmartImportHeroSection';
import { AICopilotHeroSection } from './AICopilotHeroSection';
import { SpendWisePreviewSection } from './SpendWisePreviewSection';
import { SmarterMoneySection } from './SmarterMoneySection';
import { SecuritySection } from './SecuritySection';
import { FinalCTASection } from './FinalCTASection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroVideoSection />
        <ProblemSection />
        <SolutionSection />
        <SmartImportHeroSection />
        <AICopilotHeroSection />
        <SpendWisePreviewSection />
        <SmarterMoneySection />
        <SecuritySection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};
