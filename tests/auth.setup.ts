import path from 'path';
import { getUnixTime } from 'date-fns';
import { expect, test as setup } from '@playwright/test';
import { generateId } from 'ai';

const authFile = path.join(__dirname, '../playwright/.auth/session.json');

setup('authenticate', async ({ page }) => {
  const testEmail = process.env.TEST_KEYCLOAK_USERNAME ?? `test-${getUnixTime(new Date())}`;
  const testPassword = process.env.TEST_KEYCLOAK_PASSWORD ?? generateId(16);

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
