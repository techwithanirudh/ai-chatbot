import path from 'path';
import { getUnixTime } from 'date-fns';
import { expect, test as setup } from '@playwright/test';

const authFile = path.join(__dirname, '../playwright/.auth/session.json');

setup('authenticate', async ({ page }) => {
  const testEmail = `test-${getUnixTime(new Date())}@playwright.com`;
  const testPassword = process.env.TEST_PASSWORD ?? 'password';

  await page.goto('http://localhost:3000/register');
  await page.getByTestId('toggle-auth-mode').click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill(testEmail);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(testPassword);
  await page.getByRole('button', { name: 'Sign Up' }).click();

  await expect(page.getByTestId('alert')).toContainText(
    'Account created successfully!',
  );

  await page.context().storageState({ path: authFile });
});
