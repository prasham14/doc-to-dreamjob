export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: 'Entry' | 'Mid' | 'Senior';
  skills: string[];
  postedDate: string;
  applicationUrl: string;
}

export interface UserProfile {
  name: string;
  email: string;
  title: string;
  location: string;
  skills: string[];
  resumeUrl?: string;
}

export interface SwipeAction {
  jobId: string;
  action: 'apply' | 'reject';
  timestamp: string;
}

export interface ReferralUser {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  skills: string[];
  profileImage?: string;
}