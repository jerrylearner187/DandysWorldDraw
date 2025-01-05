// app/api/skills/route.ts
import { NextResponse } from 'next/server'
import { SQL, sql } from 'drizzle-orm'
import { createDb } from '@/db/drizzle';
import { getProductTag } from '@/app/services/skills'
import { formatDateTime } from '@/utils';

export const runtime = 'edge';
export async function GET(request: Request) {
  const db = createDb(process.env.DB as any);
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const type = searchParams.get('type');
  const search = searchParams.get('search');
  let lang = searchParams.get('lang');
  const sort = searchParams.get('sort');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const minLevel = parseInt(searchParams.get('minLevel') || '1');
  const tags = searchParams.get('tags')?.split(',') || [];

  // console.log('get params:', searchParams);
  // 模拟数据库查询
  // let skills = await fetchSkills(); // 实现实际的数据获取逻辑
  let field = ''
  if (lang == 'en') {
    lang = '';
  }
  const sqlChunks: SQL[] = [];
  const sqlChunks2: SQL[] = [];
  sqlChunks.push(sql`select id,name,detail,type,category,level,image_url,video_url,new_skill,tire,cost,attack_speed,attack_damage,requires,cost_multiplier,support_requirements`);
  if (lang && lang.length > 0){
    sqlChunks.push(sql.raw(`,name_${lang}`));
  }
  sqlChunks.push(sql`from product_detail where 1=1`);
  sqlChunks2.push(sql`select count(*) as total from product_detail where 1=1`);
  // 构建WHERE条件
  if (category && category != 'all') {
    sqlChunks.push(sql`and category = ${category}`);
    sqlChunks2.push(sql`and category = ${category}`);
  }

  if (type && type != 'all') {
    sqlChunks.push(sql`and type = ${type}`);
    sqlChunks2.push(sql`and type = ${type}`);
  }

  if (search) {
    if (lang) {
      sqlChunks.push(sql.raw(`and (name LIKE "%${search}%" OR name_${lang} LIKE "%${search}%")`));
      sqlChunks2.push(sql.raw(`and (name LIKE "%${search}%" OR name_${lang} LIKE "%${search}%")`));
    } else {
      sqlChunks.push(sql.raw(`and name LIKE "%${search}%"`));
      sqlChunks2.push(sql.raw(`and name LIKE "%${search}%"`));
    }
  }
  if (sort == 'name') {
    if (lang) {
      sqlChunks.push(sql.raw(`order by name_${lang} asc`));
    } else {
      sqlChunks.push(sql`order by name asc`);
    }
  } else if (sort == 'newest') {
    sqlChunks.push(sql`order by collection_time desc`);
  }
  const sLimit = limit;
  const sOffset = (page - 1) * limit;
  sqlChunks.push(sql.raw(`limit ${sLimit} offset ${sOffset}`));
  const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));
  const finalSql2: SQL = sql.join(sqlChunks2, sql.raw(' '));
  // console.log('skill rout sql2:', finalSql2);
  const {results: countResult} = await db.run(finalSql2);
  console.log('skill rout countResult:', formatDateTime(new Date()));
  const total = countResult[0].total;
  // console.log('skill rout total:', total);
  // console.log('skill rout sql:', finalSql);
  // console.log('skill rout params:', params);
  const {results: list} = await db.run(finalSql);
  console.log('skill rout list:', formatDateTime(new Date()));
  const productIds = list.map((i: any) => i.id);
  const productMap = await getProductTag(productIds, lang || '');
  const skills = [];
  for (const item of list) {
    const tags = productMap[item.id];
    skills.push({
      id: item.id,
      name: lang && item[`name_${lang}`]? item[`name_${lang}`] : item.name,
      description: lang && item[`detail_${lang}`]? item[`detail_${lang}`] : item.detail,
      type: item.type,
      category: item.category,
      tags: tags,
      level: item.level,
      icon: item.image_url != 'N/A' ? item.image_url : '',
      video: item.video_url != 'N/A' ? item.video_url : '',
      isNewSkill: item.new_skill,
      tire: item.tire,
      cost: item.cost,
      attack_speed: item.attack_speed,
      attack_damage: item.attack_damage,
      requires: item.requires,
      cost_multiplier: item.cost_multiplier,
      support_requirements: item.support_requirements
    });
  }
  console.log('skill rout list2:', formatDateTime(new Date()));
  // console.log('skill rout skills:', skills);
  // 应用过滤器
  // skills = skills.filter(skill => {
  //   if (category && category !== 'all' && skill.category !== category) return false;
  //   if (type && type !== 'all' && skill.type !== type) return false;
  //   if (search && !skill.name.toLowerCase().includes(search.toLowerCase())) return false;
  //   if (skill.requirements.level < minLevel) return false;
  //   // @ts-ignore
  //   if (tags.length > 0 && !tags.every(tag => skill.tags.includes(tag))) return false;
  //   return true;
  // });

  return NextResponse.json({ skills, total });
}