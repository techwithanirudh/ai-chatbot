import path from 'path';
import { getUnixTime } from 'date-fns';
import { test as setup } from '@playwright/test';
import { generateId } from 'ai';

const authFile = path.join(__dirname, '../playwright/.auth/session.json');

setup('authenticate', async ({ page }) => {
  const testUsername = process.env.TEST_KEYCLOAK_USERNAME ?? `test-${getUnixTime(new Date())}`;
  const testPassword = process.env.TEST_KEYCLOAK_PASSWORD ?? generateId(16);

  await page.goto('http://localhost:3000/login');
  await page.getByRole('button', { name: 'Continue with Keycloak' }).click();
  await page.getByText("Username or email").waitFor()
  await page
    .getByLabel("Username or email")
    .fill(testUsername)
  await page.locator("#password").fill(testPassword);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.context().storageState({ path: authFile });
});
