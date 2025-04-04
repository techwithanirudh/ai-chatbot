import path from 'path';
import { test as setup } from '@playwright/test';

const authFile = path.join(__dirname, '../playwright/.auth/session.json');

if (!process.env.TEST_KEYCLOAK_USERNAME || !process.env.TEST_KEYCLOAK_PASSWORD) throw new Error("Missing TEST_KEYCLOAK_USERNAME or TEST_KEYCLOAK_PASSWORD environment variables");

setup('authenticate', async ({ page }) => {
  const testUsername = process.env.TEST_KEYCLOAK_USERNAME as string;
  const testPassword = process.env.TEST_KEYCLOAK_PASSWORD as string;

  await page.goto('http://localhost:3000/login');
  await page.getByRole('button', { name: 'Continue with Keycloak' }).click();
  await page.getByText("Username or email").waitFor()
  await page
    .getByLabel("Username or email")
    .fill(testUsername)
  await page.locator("#password").fill(testPassword);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForURL('/');
  await page.context().storageState({ path: authFile });
});
