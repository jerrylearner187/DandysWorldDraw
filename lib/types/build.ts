import { Skill } from '@/lib/types/skill'

export interface Build {
  id: string;
  title: string;
  author: string;
  description: string;
  mainSkills: Skill[];
  supportSkills: Skill[];
  created: string;
  updated: string;
}