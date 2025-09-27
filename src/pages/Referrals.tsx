import { useState, useEffect } from 'react';
import { ReferralCard } from '@/components/ReferralCard';
import { Button } from '@/components/ui/button';
import { RefreshCw, Users } from 'lucide-react';
import { ReferralUser } from '@/types';
import { mockReferralUsers } from '@/data/mockJobs';
import { storage } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

export const Referrals = () => {
  const [users, setUsers] = useState<ReferralUser[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const connectedUserIds = storage.getReferralConnections();
    const availableUsers = mockReferralUsers.filter(
      user => !connectedUserIds.includes(user.id)
    );
    
    setUsers(availableUsers);
    setCurrentUserIndex(0);
  };

  const handleSwipe = (userId: string, action: 'connect' | 'pass') => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (action === 'connect') {
      storage.addReferralConnection(userId);
      // Placeholder email function
      sendReferralEmail(user);
      toast({
        title: "Connection Request Sent! 📧",
        description: `We've sent a referral request to ${user.name}.`,
      });
    } else {
      toast({
        title: "User Passed",
        description: "We'll show you more professionals!",
      });
    }

    // Move to next user
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
    } else {
      // No more users
      setUsers([]);
    }
  };

  const sendReferralEmail = (user: ReferralUser) => {
    // Placeholder function - in real app, this would send an email
    console.log(`Sending referral email to ${user.name} at ${user.company}`);
  };

  const currentUser = users[currentUserIndex];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent to-primary/80 rounded-full flex items-center justify-center">
            <Users className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">No More Profiles!</h2>
            <p className="text-muted-foreground">
              You've seen all available professionals. Check back later for new connections!
            </p>
          </div>
          <Button onClick={loadUsers} className="bg-accent hover:bg-accent/90 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Profiles
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4 pb-20">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Find Referrals</h1>
          <p className="text-muted-foreground">
            Connect with professionals for job referrals
          </p>
        </div>

        {/* Progress indicator */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {currentUserIndex + 1} of {users.length} profiles
          </p>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentUserIndex + 1) / users.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Referral Card */}
        <ReferralCard
          user={currentUser}
          onSwipe={handleSwipe}
        />

        {/* Swipe Instruction */}
        <p className="text-center text-sm text-muted-foreground">
          Swipe right to connect • Swipe left to pass
        </p>
      </div>
    </div>
  );
};