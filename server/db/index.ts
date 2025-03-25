import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from './schema';

// biome-ignore lint: Forbidden non-null assertion.
const sql = neon(process.env.POSTGRES_URL!);
export const db = drizzle(sql, { schema });
