// components/skills/SkillsFilter.tsx
'use client';

import { Search, Filter } from 'lucide-react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { Input } from '@nextui-org/input';
import { t } from '@lingui/macro';

export const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'red', label: 'Strength Skills' },
  { value: 'green', label: 'Dexterity Skills' },
  { value: 'blue', label: 'Intelligence Skills' },
];

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'newest', label: 'Newest First' },
];

export const SKILL_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'active', label: 'Active Skills' },
  { value: 'support', label: 'Support Skills' },
];

interface SkillFilterProps {
  searchQuery: string;
  selectedCategory: Set<string>;
  selectedType: Set<string>;
  sortBy: Set<string>;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Set<string>) => void;
  onTypeChange: (value: Set<string>) => void;
  onSortChange: (value: Set<string>) => void;
}

export function SkillFilter({
                               searchQuery,
                               selectedCategory,
                               selectedType,
                               sortBy,
                               onSearchChange,
                               onCategoryChange,
                               onTypeChange,
                               onSortChange,
                             }: SkillFilterProps) {
  // @ts-ignore
  // @ts-ignore
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t`Search skills...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          selectionMode="single"
          selectedKeys={selectedCategory}
          // @ts-ignore
          onSelectionChange={onCategoryChange}
        >
          {CATEGORIES.map(category => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </Select>

        <Select
          selectionMode="single"
          selectedKeys={selectedType}
          // @ts-ignore
          onSelectionChange={onTypeChange}
        >
          {SKILL_TYPES.map(type => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </Select>

        <Select
          selectionMode="single"
          selectedKeys={sortBy}
          // @ts-ignore
          onSelectionChange={onSortChange}
        >
          {SORT_OPTIONS.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
