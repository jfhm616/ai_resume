export interface ResumeData {
  basicInfo: BasicInfo;
  education: Education[];
  workExperience: WorkExperience[];
  projectExperience: ProjectExperience[];
  skills: Skill[];
  selfEvaluation: string;
}

export interface BasicInfo {
  name: string;
  jobIntent: string;
  phone: string;
  email: string;
  avatar: string;
  personalWebsite: string;
}

export interface Education {
  id: string;
  timeRange: string;
  school: string;
  major: string;
  degree: string;
  description: string;
}

export interface WorkExperience {
  id: string;
  timeRange: string;
  company: string;
  position: string;
  description: string;
}

export interface ProjectExperience {
  id: string;
  timeRange: string;
  name: string;
  role: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export type TemplateType = 'simple' | 'campus' | 'creative';

export const defaultResumeData: ResumeData = {
  basicInfo: {
    name: '',
    jobIntent: '',
    phone: '',
    email: '',
    avatar: '',
    personalWebsite: '',
  },
  education: [],
  workExperience: [],
  projectExperience: [],
  skills: [],
  selfEvaluation: '',
};
