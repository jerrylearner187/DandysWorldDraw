// @/lib/api/builds.ts

import { Build } from '@/lib/types/build' // 假设你有一个 Build 类型定义
interface GetBuildsParams {
  page: number;
  limit: number;
}

interface GetBuildsResponse {
  builds: Build[];
  total: number;
}

export async function getBuilds({ page, limit }: GetBuildsParams): Promise<GetBuildsResponse> {
  try {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.UE_WEB_API_URL
    console.log('build url', `${baseUrl}/api/builds?page=${page}&limit=${limit}`);
    const response = await fetch(`${baseUrl}/api/builds?page=${page}&limit=${limit}`, {
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
    return data as GetBuildsResponse
  } catch (error) {
    console.error('Error fetching build:', error)
    throw error
  }
}
