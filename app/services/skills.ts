import { unstable_cache } from 'next/cache'
import { SQL, sql } from 'drizzle-orm'
import { createDb } from '@/db/drizzle'
const db = createDb(process.env.DB as any);

export async function getProductTag(productIds: number[], lang: string){
  const {results: tags} = await db.run(sql`select product_id,tag_id from product_tag where product_id in ${productIds}`);
  // console.log("getProductTag tags", tags);
  const tagIds = tags.map((i: any) => i.tag_id);
  // const placeholders = tagIds.map((_: any, index: number) => `$${index + 1}`).join(', ');
  // const placeholders = tagIds.join(',');
  const sqlChunks: SQL[] = [];
  let field = 'name';
  if (lang && lang.length > 0 && lang != 'en') {
    sqlChunks.push(sql.raw(`select id,name_${lang} from tag`));
    field = 'name_' + lang;
  } else {
    sqlChunks.push(sql.raw(`select id,name from tag`));
  }
  sqlChunks.push(sql`where id in ${tagIds}`);
  // console.log("getProductTag sqlChunks", sqlChunks);
  const { results: list } = await db.run(sql.join(sqlChunks, sql.raw(' ')));
  // console.log("getProductTag list", list);
  const tagMap: { [key: number]: string } = {};
  list.map((item: any) => tagMap[item.id] = item[field]);
  const productMap: { [key: number]: string[] } = {};
  tags.map((i: any) => {
    const tagName = tagMap[i.tag_id] ? tagMap[i.tag_id] : '';
    if (productMap[i.product_id]) {
      productMap[i.product_id].push(tagName);
    } else {
      productMap[i.product_id] = [tagName];
    }
  })
  // console.log('getProductTag', productMap);
  return productMap;
}

export const getCachedProductTag = async (productIds: number[], lang: string) => {
  // const key = `product_tag_${productId}_${lang}`;
  // // @ts-ignore
  // let data = await process.env.MY_KV.get(key);
  // // console.log('getCachedProductTag data:', data);
  // if (!data) {
  //   data = await getProductTag(productId, lang);
  //   if (data) {
  //     // @ts-ignore
  //     await process.env.MY_KV.put(key, JSON.stringify(data), {expirationTtl: 3600});
  //   }
  // } else {
  //   data = JSON.parse(data);
  // }
  // return data;

}

export async function getSkills(ids: string[], lang: string) {
  let field = '';
  if (lang && lang.length > 0 && lang != 'en') {
    field = ',name_' + lang;
  }

  const idstr = ids.join(',');
  const sqlChunks: SQL[] = [];
  sqlChunks.push(sql.raw(`SELECT id, name, detail, type, category, level, image_url, video_url, new_skill, tire,
    cost, attack_speed, attack_damage, requires, cost_multiplier, support_requirements ${field} 
    FROM product_detail`));
  sqlChunks.push(sql`WHERE id in (${idstr})`);
  const txt= sql.join(sqlChunks, sql.raw(' '));

  const { results: list } = await db.run(txt);
  const productIds = list.map((i: any) => i.id);
  const productMap = await getProductTag(productIds, lang || '');
  const skills = [];
  for (const item of list) {
    const tags = productMap[item.id];
    skills.push({
      id: item.id,
      name: lang && item[`name_${lang}`] ? item[`name_${lang}`] : item.name,
      description: lang && item[`detail_${lang}`] ? item[`detail_${lang}`] : item.detail,
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
  return skills;
}