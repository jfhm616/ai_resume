import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, TemplateType, defaultResumeData, Education, WorkExperience, ProjectExperience, Skill } from '../types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
  updateBasicInfo: (field: keyof ResumeData['basicInfo'], value: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  removeEducation: (id: string) => void;
  addWorkExperience: () => void;
  updateWorkExperience: (id: string, field: keyof WorkExperience, value: string) => void;
  removeWorkExperience: (id: string) => void;
  addProjectExperience: () => void;
  updateProjectExperience: (id: string, field: keyof ProjectExperience, value: string) => void;
  removeProjectExperience: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, field: keyof Skill, value: string | number) => void;
  removeSkill: (id: string) => void;
  updateSelfEvaluation: (value: string) => void;
  resetResume: () => void;
  reorderModules: (moduleOrder: string[]) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: defaultResumeData,
      template: 'simple',

      setTemplate: (template) => set({ template }),

      updateBasicInfo: (field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            basicInfo: { ...state.resumeData.basicInfo, [field]: value },
          },
        })),

      addEducation: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [
              ...state.resumeData.education,
              { id: generateId(), timeRange: '', school: '', major: '', degree: '', description: '' },
            ],
          },
        })),

      updateEducation: (id, field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((item) =>
              item.id === id ? { ...item, [field]: value } : item
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((item) => item.id !== id),
          },
        })),

      addWorkExperience: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: [
              ...state.resumeData.workExperience,
              { id: generateId(), timeRange: '', company: '', position: '', description: '' },
            ],
          },
        })),

      updateWorkExperience: (id, field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: state.resumeData.workExperience.map((item) =>
              item.id === id ? { ...item, [field]: value } : item
            ),
          },
        })),

      removeWorkExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: state.resumeData.workExperience.filter((item) => item.id !== id),
          },
        })),

      addProjectExperience: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projectExperience: [
              ...state.resumeData.projectExperience,
              { id: generateId(), timeRange: '', name: '', role: '', description: '' },
            ],
          },
        })),

      updateProjectExperience: (id, field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projectExperience: state.resumeData.projectExperience.map((item) =>
              item.id === id ? { ...item, [field]: value } : item
            ),
          },
        })),

      removeProjectExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projectExperience: state.resumeData.projectExperience.filter((item) => item.id !== id),
          },
        })),

      addSkill: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [...state.resumeData.skills, { id: generateId(), name: '', level: 3 }],
          },
        })),

      updateSkill: (id, field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((item) =>
              item.id === id ? { ...item, [field]: value } : item
            ),
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((item) => item.id !== id),
          },
        })),

      updateSelfEvaluation: (value) =>
        set((state) => ({
          resumeData: { ...state.resumeData, selfEvaluation: value },
        })),

      resetResume: () => set({ resumeData: defaultResumeData }),

      reorderModules: () => {},
    }),
    {
      name: 'ai-resume-storage',
    }
  )
);
