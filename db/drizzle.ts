// src/db/index.ts
import { drizzle } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';

let _db: ReturnType<typeof drizzle> | null = null;
export function createDb(d1: D1Database) {
  if (!_db) {
    _db = drizzle(d1, {});
  }
  return _db;
}