// app/api/builds/[id]/route.ts

import { NextResponse } from 'next/server'
import type { Build } from '@/lib/types/build'
import { z } from 'zod';
// import { query } from '@/config/pg'
import { SQL, sql } from 'drizzle-orm'
import { createDb } from '@/db/drizzle';
import { getSkills } from '@/app/services/skills'
export const runtime = 'edge';
const BuildSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().optional(),
  mainSkills: z.string(),
  supportSkills: z.string()
});

export async function POST(req: Request) {
  const db = createDb(process.env.DB as any);
  try {
    // 解析和验证请求数据
    const body = await req.json();
    const validated = BuildSchema.parse(body);

    // 验证技能数量
    if (validated.mainSkills.length === 0) {
      return NextResponse.json(
        { error: 'At least one main skill is required' },
        { status: 400 }
      );
    }

    const insertQuery = sql`
      INSERT INTO builds (
        title,
        author,
        description,
        main_skills,
        support_skills,
        created_at,
        updated_at
      )
      VALUES (${validated.title}, ${validated.author}, 
        ${validated.description || ''}, ${validated.mainSkills}, 
        ${validated.supportSkills}, NOW(), NOW())
      RETURNING 
        id,
        title,
        author,
        description,
        main_skills,
        support_skills,
        created_at,
        updated_at
    `;

    const result = await db.run(insertQuery);

    return NextResponse.json(result.rows[0]);

  } catch (error) {
    console.error('Build creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch all builds with pagination
export async function GET(req: Request) {
  const db = createDb(process.env.DB as any);
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const lang = searchParams.get('lang') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // 如果提供了 id，返回单个构建
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid build ID is required' },
          { status: 400 }
        );
      }

      const txt = sql`
        SELECT *
        FROM builds
        WHERE id = ${id}
      `;

      const result = await db.run(txt);

      if (result.results.length === 0) {
        return NextResponse.json(
          { error: 'Build not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(result.rows[0]);
    }

    const txt = sql.raw(`
      SELECT 
        id,
        title,
        author,
        description,
        main_skills,
        support_skills,
        created_at,
        updated_at
      FROM builds
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `);

    const countQuery = sql`
      SELECT COUNT(*) as count FROM builds
    `;

    const [builds, totalCount] = await Promise.all([
      db.run(txt),
      db.run(countQuery)
    ]);
    // console.log('build api builds:', builds);
    // console.log('build api builds count:', totalCount);
    const list: Build[] = [];
    for (const item of builds.results) {
      const mainSkillIds = item.main_skills.split(',');
      const supportSkillIds = item.support_skills.split(',');
      const mainSkills = await getSkills(mainSkillIds,  lang);
      const supportSkills = await getSkills(supportSkillIds, lang);
      list.push({
        id: item.id,
        title: item.title,
        author: item.author,
        description: item.description,
        mainSkills: mainSkills,
        supportSkills: supportSkills,
        created: item.created_at,
        updated: item.updated_at
      });
    }

    return NextResponse.json({
      builds: list,
      total: parseInt(totalCount.results[0].count)
    });

  } catch (error) {
    console.error('Error fetching builds:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
