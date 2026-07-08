import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Locate or create the local sqlite.db database file
const dbPath = path.resolve(process.cwd(), 'sqlite.db');

// Declare type for global namespace
const globalForDb = globalThis as unknown as {
  sqlite: Database.Database | undefined;
  db: any | undefined;
};

if (!globalForDb.sqlite) {
  globalForDb.sqlite = new Database(dbPath);
}

export const sqlite = globalForDb.sqlite;
export const db = globalForDb.db || drizzle(globalForDb.sqlite, { schema });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.db = db;
}

export type DatabaseInstance = typeof db;
