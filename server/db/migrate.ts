import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// Try to load from .env.local first, then fall back to .env
config({
  path: '.env.local',
});

// If POSTGRES_URL is not defined, try loading from .env
if (!process.env.POSTGRES_URL) {
  config({
    path: '.env',
  });
}

const runMigrate = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined');
  }

  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(connection);

  console.log('⏳ Running migrations...');

  const start = Date.now();
  // await migrate(db, { migrationsFolder: './lib/db/migrations' });
  await migrate(db, { migrationsFolder: './server/db/migrations' });

  const end = Date.now();

  console.log('✅ Migrations completed in', end - start, 'ms');
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});
