import path from 'node:path';
import { generateId } from 'ai';
import { getUnixTime } from 'date-fns';
import { test as setup } from '@playwright/test';

const authFile = path.join(__dirname, '../playwright/.auth/session.json');

setup('authenticate', async ({ page }) => {
  const [testFirstName, testLastName] = ['John', 'Doe'];
  const testUsername = `test-${getUnixTime(new Date())}`;
  const testEmail = `${testUsername}@playwright.com`;
  const testPassword = generateId(16);

  await page.goto('http://localhost:3000/register');
  await page.getByRole('button', { name: 'Continue with Keycloak' }).click();
  await page.getByText('Username or email').waitFor();
  await page.getByLabel('Username or email').fill(testEmail);
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('#username').fill(testEmail);
  await page.locator('#password').fill(testPassword);
  await page.locator('#password-confirm').fill(testPassword);
  await page.locator('#email').fill(testEmail);
  await page.locator('#firstName').fill(testFirstName);
  await page.locator('#lastName').fill(testLastName);
  await page.getByRole('button', { name: 'Register' }).click();

  await page.waitForURL(url => {
    const pathname = url.pathname
    return pathname === '/';
  });
  await page.context().storageState({ path: authFile });
});
