import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  title: string
  summary: string
  website?: string
  linkedin?: string
  github?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
}

export interface Resume {
  id?: string
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  createdAt?: Date
  updatedAt?: Date
}

interface ResumeStore {
  resume: Resume
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addExperience: (exp: Experience) => void
  updateExperience: (id: string, exp: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: (edu: Education) => void
  updateEducation: (id: string, edu: Partial<Education>) => void
  removeEducation: (id: string) => void
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  setSkills: (skills: string[]) => void
  resetResume: () => void
}

const initialResume: Resume = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,
      
      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
          },
        })),
      
      addExperience: (exp) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [...state.resume.experience, exp],
          },
        })),
      
      updateExperience: (id, exp) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((e) =>
              e.id === id ? { ...e, ...exp } : e
            ),
          },
        })),
      
      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((e) => e.id !== id),
          },
        })),
      
      addEducation: (edu) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [...state.resume.education, edu],
          },
        })),
      
      updateEducation: (id, edu) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((e) =>
              e.id === id ? { ...e, ...edu } : e
            ),
          },
        })),
      
      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((e) => e.id !== id),
          },
        })),
      
      addProject: (project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [...state.resume.projects, project],
          },
        })),
      
      updateProject: (id, project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((p) =>
              p.id === id ? { ...p, ...project } : p
            ),
          },
        })),
      
      removeProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((p) => p.id !== id),
          },
        })),
      
      setSkills: (skills) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills,
          },
        })),
      
      resetResume: () => set({ resume: initialResume }),
    }),
    {
      name: 'resume-storage',
    }
  )
)