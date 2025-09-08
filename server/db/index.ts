import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from './schema';
import { env } from '@/env';

// biome-ignore lint: Forbidden non-null assertion.
const sql = neon(env.POSTGRES_URL!);
export const db = drizzle(sql, { schema });
