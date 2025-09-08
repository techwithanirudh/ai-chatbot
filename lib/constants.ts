import { env } from '@/env';

export const isProductionEnvironment = env.NODE_ENV === 'production';

export const isTestEnvironment = Boolean(
  env.PLAYWRIGHT_TEST_BASE_URL || env.PLAYWRIGHT || env.CI_PLAYWRIGHT,
);

export const baseUrl =
  !isProductionEnvironment || !env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${env.VERCEL_PROJECT_PRODUCTION_URL}`);
