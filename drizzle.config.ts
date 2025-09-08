import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { env } from './env';

config({
  path: '.env.local',
});

export default defineConfig({
  schema: './server/db/schema/index.ts',
  out: './server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // biome-ignore lint: Forbidden non-null assertion.
    url: env.POSTGRES_URL!,
  },
  tablesFilter: ['ai-chatbot_*'],
});
