import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { JobSwipe } from "./pages/JobSwipe";
import { Referrals } from "./pages/Referrals";
import { AppliedJobs } from "./pages/AppliedJobs";
import { Navigation } from "./components/Navigation";

const queryClient = new QueryClient();

type TabType = 'home' | 'jobs' | 'referrals' | 'applied';

const App = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={setActiveTab} />;
      case 'jobs':
        return <JobSwipe />;
      case 'referrals':
        return <Referrals />;
      case 'applied':
        return <AppliedJobs />;
      default:
        return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="relative">
          {renderActiveTab()}
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
