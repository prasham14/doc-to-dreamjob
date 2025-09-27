import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, DollarSign, X, Heart } from 'lucide-react';
import { Job } from '@/types';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  onSwipe: (jobId: string, action: 'apply' | 'reject') => void;
  className?: string;
}

export const JobCard = ({ job, onSwipe, className }: JobCardProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (action: 'apply' | 'reject') => {
    setExitDirection(action === 'apply' ? 'right' : 'left');
    setIsExiting(true);
    
    setTimeout(() => {
      onSwipe(job.id, action);
    }, 300);
  };

  return (
    <Card className={cn(
      "card-swipe p-6 max-w-sm mx-auto transition-all duration-300",
      isExiting && exitDirection === 'right' && "translate-x-full opacity-0 rotate-12",
      isExiting && exitDirection === 'left' && "-translate-x-full opacity-0 -rotate-12",
      className
    )}>
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-card-foreground">{job.title}</h3>
          <p className="text-lg font-semibold text-primary">{job.company}</p>
        </div>

        {/* Location & Date */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(job.postedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Salary & Job Type */}
        <div className="flex items-center gap-4">
          {job.salary && (
            <div className="flex items-center gap-1 text-success">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium">{job.salary}</span>
            </div>
          )}
          <Badge variant="secondary">{job.jobType}</Badge>
          <Badge variant="outline">{job.experience}</Badge>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {job.description}
        </p>

        {/* Skills */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Required Skills:</p>
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 4).map((skill) => (
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
            onClick={() => handleSwipe('reject')}
          >
            <X className="w-5 h-5 mr-2" />
            Pass
          </Button>
          <Button
            size="lg"
            className="flex-1 btn-apply bg-success hover:bg-success/90"
            onClick={() => handleSwipe('apply')}
          >
            <Heart className="w-5 h-5 mr-2" />
            Apply
          </Button>
        </div>
      </div>
    </Card>
  );
};