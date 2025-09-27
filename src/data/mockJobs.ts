import { Job, ReferralUser } from '@/types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    description: 'Looking for an experienced React developer to join our growing team. You will work on cutting-edge web applications using modern technologies.',
    salary: '$120k - $160k',
    jobType: 'Full-time',
    experience: 'Senior',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    postedDate: '2024-01-15',
    applicationUrl: 'https://techcorp.com/careers/frontend-dev'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'New York, NY',
    description: 'Drive product strategy and roadmap for our SaaS platform. Work closely with engineering and design teams to deliver exceptional user experiences.',
    salary: '$140k - $180k',
    jobType: 'Full-time',
    experience: 'Mid',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
    postedDate: '2024-01-14',
    applicationUrl: 'https://innovatelabs.com/jobs/pm'
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'DesignStudio',
    location: 'Remote',
    description: 'Create beautiful and intuitive user experiences for mobile and web applications. Collaborate with product teams to solve complex user problems.',
    salary: '$85k - $120k',
    jobType: 'Full-time',
    experience: 'Mid',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    postedDate: '2024-01-13',
    applicationUrl: 'https://designstudio.com/careers/ux'
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'DataCorp',
    location: 'Austin, TX',
    description: 'Analyze large datasets to extract insights and build predictive models. Work with machine learning algorithms and statistical analysis.',
    salary: '$110k - $150k',
    jobType: 'Full-time',
    experience: 'Senior',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    postedDate: '2024-01-12',
    applicationUrl: 'https://datacorp.com/jobs/data-scientist'
  },
  {
    id: '5',
    title: 'Marketing Manager',
    company: 'GrowthCo',
    location: 'Los Angeles, CA',
    description: 'Lead marketing campaigns and growth initiatives. Develop strategies to increase user acquisition and engagement.',
    salary: '$90k - $130k',
    jobType: 'Full-time',
    experience: 'Mid',
    skills: ['Digital Marketing', 'Analytics', 'Content Strategy', 'SEO'],
    postedDate: '2024-01-11',
    applicationUrl: 'https://growthco.com/careers/marketing'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Seattle, WA',
    description: 'Manage cloud infrastructure and deployment pipelines. Ensure high availability and scalability of our systems.',
    salary: '$115k - $155k',
    jobType: 'Full-time',
    experience: 'Senior',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    postedDate: '2024-01-10',
    applicationUrl: 'https://cloudtech.com/jobs/devops'
  }
];

export const mockReferralUsers: ReferralUser[] = [
  {
    id: 'ref1',
    name: 'Sarah Chen',
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    experience: '6 years',
    skills: ['React', 'Python', 'System Design', 'Leadership'],
  },
  {
    id: 'ref2',
    name: 'Michael Rodriguez',
    title: 'Product Manager',
    company: 'Meta',
    location: 'Menlo Park, CA',
    experience: '5 years',
    skills: ['Product Strategy', 'Data Analysis', 'User Research', 'Agile'],
  },
  {
    id: 'ref3',
    name: 'Emily Johnson',
    title: 'UX Designer',
    company: 'Apple',
    location: 'Cupertino, CA',
    experience: '4 years',
    skills: ['UI/UX Design', 'Prototyping', 'User Testing', 'Design Systems'],
  },
  {
    id: 'ref4',
    name: 'David Kim',
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    experience: '7 years',
    skills: ['Machine Learning', 'Python', 'Statistics', 'A/B Testing'],
  }
];