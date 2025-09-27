import { useState, useEffect } from 'react';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { RefreshCw, Heart } from 'lucide-react';
import { Job } from '@/types';
import { mockJobs } from '@/data/mockJobs';
import { storage } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

export const JobSwipe = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    const rejectedJobIds = storage.getRejectedJobs();
    const appliedJobs = storage.getAppliedJobs();
    const appliedJobIds = appliedJobs.map(job => job.id);
    
    const availableJobs = mockJobs.filter(
      job => !rejectedJobIds.includes(job.id) && !appliedJobIds.includes(job.id)
    );
    
    setJobs(availableJobs);
    setCurrentJobIndex(0);
  };

  const handleSwipe = (jobId: string, action: 'apply' | 'reject') => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    if (action === 'apply') {
      storage.addAppliedJob(job);
      // Simulate opening job application in new tab
      window.open(job.applicationUrl, '_blank');
      toast({
        title: "Applied Successfully! 🎉",
        description: `Your application to ${job.company} has been submitted.`,
      });
    } else {
      storage.addRejectedJob(jobId);
      toast({
        title: "Job Passed",
        description: "We'll find you better matches!",
      });
    }

    storage.addSwipeAction({
      jobId,
      action,
      timestamp: new Date().toISOString()
    });

    // Move to next job
    if (currentJobIndex < jobs.length - 1) {
      setCurrentJobIndex(prev => prev + 1);
    } else {
      // No more jobs
      setJobs([]);
    }
  };

  const currentJob = jobs[currentJobIndex];

  if (!currentJob) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">No More Jobs!</h2>
            <p className="text-muted-foreground">
              You've seen all available positions. Check back later for new opportunities!
            </p>
          </div>
          <Button onClick={loadJobs} className="hero-gradient text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4 pb-20">
      <div className="w-full max-w-md space-y-6">
        {/* Progress indicator */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {currentJobIndex + 1} of {jobs.length} jobs
          </p>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="hero-gradient h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentJobIndex + 1) / jobs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Job Card */}
        <JobCard
          job={currentJob}
          onSwipe={handleSwipe}
        />

        {/* Swipe Instruction */}
        <p className="text-center text-sm text-muted-foreground">
          Swipe right to apply • Swipe left to pass
        </p>
      </div>
    </div>
  );
};