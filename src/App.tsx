import React from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { LandingPage } from './components/landing/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { AppLayout } from './components/app/AppLayout';
import { ToastNotification } from './components/common/ToastNotification';

import { DashboardView } from './components/app/views/DashboardView';
import { SmartImportView } from './components/app/views/SmartImportView';
import { TransactionsView } from './components/app/views/TransactionsView';
import { AnalyticsView } from './components/app/views/AnalyticsView';
import { BudgetsView } from './components/app/views/BudgetsView';
import { AICopilotView } from './components/app/views/AICopilotView';
import { ForecastView } from './components/app/views/ForecastView';
import { ReceiptScannerView } from './components/app/views/ReceiptScannerView';
import { BeforeYouSpendView } from './components/app/views/BeforeYouSpendView';
import { ChallengesView } from './components/app/views/ChallengesView';
import { SettingsView } from './components/app/views/SettingsView';

const MainRouter: React.FC = () => {
  const { currentView, activeTab } = useFinance();

  if (currentView === 'landing') {
    return <LandingPage />;
  }

  if (currentView === 'auth') {
    return <AuthPage />;
  }

  // Authenticated App Shell
  return (
    <AppLayout>
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'import' && <SmartImportView />}
      {activeTab === 'transactions' && <TransactionsView />}
      {activeTab === 'analytics' && <AnalyticsView />}
      {activeTab === 'budgets' && <BudgetsView />}
      {activeTab === 'copilot' && <AICopilotView />}
      {activeTab === 'forecast' && <ForecastView />}
      {activeTab === 'receipts' && <ReceiptScannerView />}
      {activeTab === 'before-you-spend' && <BeforeYouSpendView />}
      {activeTab === 'challenges' && <ChallengesView />}
      {activeTab === 'settings' && <SettingsView />}
    </AppLayout>
  );
};

export function App() {
  return (
    <FinanceProvider>
      <MainRouter />
      <ToastNotification />
    </FinanceProvider>
  );
}

export default App;
