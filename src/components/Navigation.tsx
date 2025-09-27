import { Button } from '@/components/ui/button';
import { Home, Heart, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: 'home' | 'jobs' | 'referrals' | 'applied';
  onTabChange: (tab: 'home' | 'jobs' | 'referrals' | 'applied') => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'jobs' as const, label: 'Jobs', icon: Heart },
    { id: 'referrals' as const, label: 'Referrals', icon: Users },
    { id: 'applied' as const, label: 'Applied', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/20 backdrop-blur-md z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant="ghost"
            size="sm"
            className={cn(
              "flex flex-col items-center gap-1 p-2 min-w-[4rem] transition-all duration-200",
              activeTab === id 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onTabChange(id)}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};