// @/lib/api/builds.ts

import { Skill } from '@/lib/types/skill' // 假设你有一个 Build 类型定义
interface GetBuildsParams {
  lang: string;
  page: string;
  limit: string;
  category: string;
  type: string;
  sort: string;
  search: string;
}

interface GetSkillsResponse {
  skills: Skill[];
  total: number;
}

export async function getSkills(params: GetBuildsParams): Promise<GetSkillsResponse> {
  try {
    const queryParams = new URLSearchParams({...params});
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.UE_WEB_API_URL
    console.log('skill url', `${baseUrl}/api/skills?${queryParams}`);
    const response = await fetch(`${baseUrl}/api/skills?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=60'
      },
      cf: {
        cacheTtl: 300,
        cacheEverything: true
      }
    } as RequestInit)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data as GetSkillsResponse
  } catch (error) {
    console.error('Error fetching build:', error)
    throw error
  }
}
