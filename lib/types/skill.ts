export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'active' | 'support';
  category: 'red' | 'green' | 'blue';
  tags: string[];
  level: string;
  tire: string;
  cost: string;
  attack_speed: string;
  attack_damage: string;
  requires: string;
  cost_multiplier: string;
  support_requirements: string;
  icon: string;
  video?: string;
  isNewSkill: boolean;
}