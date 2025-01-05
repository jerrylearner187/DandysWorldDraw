// components/skills/SkillsPageClient.tsx
'use client';

import { useCallback, useEffect, useState } from 'react'
import { SkillFilter } from './SkillFilter'
import { Pagination } from './pagination'
import { SkillBuilder } from './SkillBuilder'
import { SkillCard } from './SkillCard'
import { Skill } from '@/lib/types/skill'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { AVAILABLE_LOCALES } from '@/framework/locale/locale'

interface SkillsPageClientProps {
  initialSkills: Skill[];
  initialView: 'grid' | 'builder';
  initialPage: number;
  totalPages: number;
  initialCategory: string;
  initialType: string;
  initialSort: string;
  initialSearch: string;
  lang: AVAILABLE_LOCALES;
}

export function SkillsPageClient({
                                   initialSkills,
                                   initialView,
                                   initialPage,
                                   totalPages: initialTotalPages,
                                   initialCategory,
                                   initialType,
                                   initialSort,
                                   initialSearch,
                                    lang
                                 }: SkillsPageClientProps) {
  const router = useRouter();
  // 状态管理
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  // 状态管理
  const [viewMode, setViewMode] = useState<'grid' | 'builder'>(initialView);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(new Set([initialCategory]));
  const [selectedType, setSelectedType] = useState(new Set([initialType]));
  const [sortBy, setSortBy] = useState(new Set([initialSort]));
  const [currentPage, setCurrentPage] = useState(initialPage);

  // 获取数据的函数
  const fetchSkills = useCallback(async ({
                                            lang,
                                           page,
                                           category,
                                           type,
                                           sort,
                                           search
                                         }: {
    lang: string;
    page: number;
    category: string;
    type: string;
    sort: string;
    search: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        lang: lang,
        page: page.toString(),
        limit: '12', // 每页显示数量
        category,
        type,
        sort,
        search,
      });
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.UE_WEB_API_URL
      const response = await fetch(`${baseUrl}/api/skills?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }

      const data = await response.json();
      setSkills(data.skills);
      setTotalPages(Math.ceil(data.total / 12));

      // 更新 URL，但不触发新的数据获取
      // const params = new URLSearchParams({
      //   page: page.toString(),
      //   category,
      //   type,
      //   sort,
      //   search,
      //   view: viewMode,
      // });
      // window.history.pushState({}, '', `?${params.toString()}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  }, [viewMode]);

  // 监听筛选条件变化
  useEffect(() => {
    fetchSkills({
      lang: lang,
      page: currentPage,
      category: Array.from(selectedCategory)[0],
      type: Array.from(selectedType)[0],
      sort: Array.from(sortBy)[0],
      search: searchQuery,
    });
  }, [currentPage, selectedCategory, selectedType, sortBy, searchQuery, fetchSkills]);

  // 处理搜索
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // 重置页码
  };

  // 处理分类筛选
  const handleCategoryChange = (value: Set<string>) => {
    const category = Array.from(value)[0];
    setSelectedCategory(value);
    setCurrentPage(1); // 重置页码
  };

  // 处理类型筛选
  const handleTypeChange = (value: Set<string>) => {
    const type = Array.from(value)[0];
    setSelectedType(value);
    setCurrentPage(1); // 重置页码
  };

  // 处理排序
  const handleSortChange = (value: Set<string>) => {
    setSortBy(value);
  };

  // 处理分页
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SkillFilter
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        sortBy={sortBy}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onTypeChange={handleTypeChange}
        onSortChange={handleSortChange}
      />

      {viewMode === 'grid' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <SkillBuilder
          availableSkills={skills}
          lang={lang}
        />
      )}
    </>
  );
}
