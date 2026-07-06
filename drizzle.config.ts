import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/schema.ts',
  out: './src/lib/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'sqlite.db',
  },
});
