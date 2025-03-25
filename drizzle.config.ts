import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({
  path: '.env.local',
});

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // biome-ignore lint: Forbidden non-null assertion.
    url: process.env.POSTGRES_URL!,
  },
  tablesFilter: ['aitutor_*'],
});
