import fs from 'node:fs';
import path from 'node:path';
import {
  type APIRequestContext,
  type Browser,
  type BrowserContext,
  expect,
  type Page,
} from '@playwright/test';
import { generateId } from 'ai';
import { getUnixTime } from 'date-fns';

export type UserContext = {
  context: BrowserContext;
  page: Page;
  request: APIRequestContext;
};

export async function createAuthenticatedContext({
  browser,
  name,
}: {
  browser: Browser;
  name: string;
}): Promise<UserContext> {
  const authDir = path.join(__dirname, '../playwright/.auth');

  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const storageFile = path.join(authDir, `${name}.json`);

  const context = await browser.newContext();
  const page = await context.newPage();

  const [firstName, lastName] = ['John', 'Doe'];
  const email = `test-${name}-${getUnixTime(new Date())}@playwright.com`;
  const password = generateId(16);

  await page.goto('http://localhost:3000/register');
  await page.getByRole('button', { name: 'Continue with Keycloak' }).click();
  await page.getByText('Username or email').waitFor();
  await page.getByLabel('Username or email').fill(email);
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('#username').fill(email);
  await page.locator('#password').fill(password);
  await page.locator('#password-confirm').fill(password);
  await page.locator('#email').fill(email);
  await page.locator('#firstName').fill(firstName);
  await page.locator('#lastName').fill(lastName);
  await page.getByRole('button', { name: 'Register' }).click();

  await page.waitForURL((url) => {
    const pathname = url.pathname;
    return pathname === '/';
  });

  await context.storageState({ path: storageFile });
  await page.close();

  const newContext = await browser.newContext({ storageState: storageFile });
  const newPage = await newContext.newPage();

  return {
    context: newContext,
    page: newPage,
    request: newContext.request,
  };
}
