import { Job, SwipeAction, UserProfile, ReferralUser } from '@/types';

const STORAGE_KEYS = {
  USER_PROFILE: 'tincareer_user_profile',
  APPLIED_JOBS: 'tincareer_applied_jobs',
  REJECTED_JOBS: 'tincareer_rejected_jobs',
  SWIPE_HISTORY: 'tincareer_swipe_history',
  REFERRAL_CONNECTIONS: 'tincareer_referral_connections'
};

export const storage = {
  // User Profile
  saveUserProfile: (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getUserProfile: (): UserProfile | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  },

  // Applied Jobs
  addAppliedJob: (job: Job) => {
    const appliedJobs = storage.getAppliedJobs();
    const updatedJobs = [...appliedJobs, job];
    localStorage.setItem(STORAGE_KEYS.APPLIED_JOBS, JSON.stringify(updatedJobs));
  },

  getAppliedJobs: (): Job[] => {
    const data = localStorage.getItem(STORAGE_KEYS.APPLIED_JOBS);
    return data ? JSON.parse(data) : [];
  },

  // Rejected Jobs
  addRejectedJob: (jobId: string) => {
    const rejectedJobs = storage.getRejectedJobs();
    const updatedJobs = [...rejectedJobs, jobId];
    localStorage.setItem(STORAGE_KEYS.REJECTED_JOBS, JSON.stringify(updatedJobs));
  },

  getRejectedJobs: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REJECTED_JOBS);
    return data ? JSON.parse(data) : [];
  },

  // Swipe History
  addSwipeAction: (action: SwipeAction) => {
    const history = storage.getSwipeHistory();
    const updatedHistory = [...history, action];
    localStorage.setItem(STORAGE_KEYS.SWIPE_HISTORY, JSON.stringify(updatedHistory));
  },

  getSwipeHistory: (): SwipeAction[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SWIPE_HISTORY);
    return data ? JSON.parse(data) : [];
  },

  // Referral Connections
  addReferralConnection: (userId: string) => {
    const connections = storage.getReferralConnections();
    const updatedConnections = [...connections, userId];
    localStorage.setItem(STORAGE_KEYS.REFERRAL_CONNECTIONS, JSON.stringify(updatedConnections));
  },

  getReferralConnections: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REFERRAL_CONNECTIONS);
    return data ? JSON.parse(data) : [];
  }
};