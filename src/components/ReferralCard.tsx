import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, X, Mail } from 'lucide-react';
import { ReferralUser } from '@/types';
import { cn } from '@/lib/utils';

interface ReferralCardProps {
  user: ReferralUser;
  onSwipe: (userId: string, action: 'connect' | 'pass') => void;
  className?: string;
}

export const ReferralCard = ({ user, onSwipe, className }: ReferralCardProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (action: 'connect' | 'pass') => {
    setExitDirection(action === 'connect' ? 'right' : 'left');
    setIsExiting(true);
    
    setTimeout(() => {
      onSwipe(user.id, action);
    }, 300);
  };

  const sendEmail = () => {
    // Placeholder function for sending connection email
    console.log(`Sending connection email to ${user.name}`);
  };

  return (
    <Card className={cn(
      "card-swipe p-6 max-w-sm mx-auto transition-all duration-300",
      isExiting && exitDirection === 'right' && "translate-x-full opacity-0 rotate-12",
      isExiting && exitDirection === 'left' && "-translate-x-full opacity-0 -rotate-12",
      className
    )}>
      <div className="space-y-4">
        {/* Profile Header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-2xl text-white font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <h3 className="text-xl font-bold text-card-foreground">{user.name}</h3>
          <p className="text-lg text-primary font-medium">{user.title}</p>
        </div>

        {/* Company & Location */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span className="font-medium">{user.company}</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
        </div>

        {/* Experience */}
        <div className="text-center">
          <Badge variant="secondary" className="text-sm">
            {user.experience} experience
          </Badge>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-center">Top Skills:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {user.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 btn-reject border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => handleSwipe('pass')}
          >
            <X className="w-5 h-5 mr-2" />
            Pass
          </Button>
          <Button
            size="lg"
            className="flex-1 btn-apply bg-accent hover:bg-accent/90"
            onClick={() => {
              handleSwipe('connect');
              sendEmail();
            }}
          >
            <Mail className="w-5 h-5 mr-2" />
            Connect
          </Button>
        </div>
      </div>
    </Card>
  );
};