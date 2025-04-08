import { ingestContent } from './ingest-content.js';
import { config } from 'dotenv';

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

async function main() {
  await Promise.all([ingestContent()]);
}

main().catch((e) => {
  console.error('Failed to run post build script', e);
});
