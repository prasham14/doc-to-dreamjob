import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Calendar, Briefcase } from 'lucide-react';
import { Job } from '@/types';
import { storage } from '@/utils/storage';

export const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const jobs = storage.getAppliedJobs();
    setAppliedJobs(jobs);
  }, []);

  if (appliedJobs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center p-4 pb-20">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-success to-success-glow rounded-full flex items-center justify-center">
            <Briefcase className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">No Applications Yet</h2>
            <p className="text-muted-foreground">
              Start swiping on jobs to see your applications here!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Applied Jobs</h1>
          <p className="text-muted-foreground">
            Track your job applications ({appliedJobs.length} total)
          </p>
        </div>

        {/* Applied Jobs List */}
        <div className="space-y-4">
          {appliedJobs.map((job) => (
            <Card key={job.id} className="card-swipe p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-card-foreground">{job.title}</h3>
                    <p className="text-primary font-semibold">{job.company}</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">Applied</Badge>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-1 text-success">
                      <span className="font-medium">{job.salary}</span>
                    </div>
                  )}
                </div>

                {/* Job Type & Experience */}
                <div className="flex gap-2">
                  <Badge variant="secondary">{job.jobType}</Badge>
                  <Badge variant="outline">{job.experience}</Badge>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(job.applicationUrl, '_blank')}
                  className="w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Original Posting
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};