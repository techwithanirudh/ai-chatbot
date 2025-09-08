import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
import { vercel } from '@t3-oss/env-core/presets-zod';

export const env = createEnv({
  extends: [vercel()],
  server: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    // Bundle analyzer
    ANALYZE: z.enum(['true', 'false']).optional(),
    // AI SDK - OpenAI
    OPENAI_API_KEY: z.string().startsWith('sk-'),
    // Auth
    AUTH_SECRET: z.string(),
    // Auth - Keycloak
    AUTH_KEYCLOAK_ISSUER: z.string().url().optional(),
    AUTH_KEYCLOAK_ID: z.string().optional(),
    AUTH_KEYCLOAK_SECRET: z.string().optional(),
    // Auth - Resend
    AUTH_RESEND_FROM: z.string().email().optional(),
    AUTH_RESEND_KEY: z.string().startsWith('re_').optional(),
    // Auth - Google
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    // Database
    POSTGRES_URL: z.string().url(),
    BLOB_READ_WRITE_TOKEN: z.string().startsWith('vercel_blob_'),
    // Playwright
    PLAYWRIGHT_TEST_BASE_URL: z.string().optional(),
    PLAYWRIGHT: z.string().optional(),
    CI_PLAYWRIGHT: z.string().optional(),
    CI: z.string().optional(),
    // Server
    PORT: z.string().optional(),
  },
  client: {},
  experimental__runtimeEnv: {},
});
