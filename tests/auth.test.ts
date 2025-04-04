// todo: fix
import { generateId } from 'ai';
import { getUnixTime } from 'date-fns';
import { test, expect, Page } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

const testEmail = process.env.TEST_KEYCLOAK_USERNAME ?? `test-${getUnixTime(new Date())}`;
const testPassword = process.env.TEST_KEYCLOAK_PASSWORD ?? generateId(16);

class AuthPage {
  constructor(private page: Page) {}

  async gotoLogin() {
    await this.page.goto('/login');
    await expect(this.page.getByRole('heading')).toContainText('Sign In');
  }

  async gotoRegister() {
    await this.page.goto('/register');
    await expect(this.page.getByRole('heading')).toContainText('Sign Up');
  }

  async register(email: string, password: string) {
    await this.gotoRegister();
    await this.page.getByTestId('toggle-auth-mode').click();
    await this.page.getByPlaceholder('Email address').click();
    await this.page.getByPlaceholder('Email address').fill(email);
    await this.page.getByLabel('Password').click();
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign Up' }).click();
  }

  async login(email: string, password: string) {
    await this.gotoLogin();
    await this.page.getByTestId('toggle-auth-mode').click();
    await this.page.getByPlaceholder('Email address').click();
    await this.page.getByPlaceholder('Email address').fill(email);
    await this.page.getByLabel('Password').click();
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async expectAlertToContain(text: string) {
    await expect(this.page.getByTestId('alert')).toContainText(text);
  }
}

test.describe
  .serial('authentication', () => {
    let authPage: AuthPage;

    test.beforeEach(async ({ page }) => {
      authPage = new AuthPage(page);
    });

    test('redirect to login page when unauthenticated', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByRole('heading')).toContainText('Welcome Back');
    });

    test('register a test account', async ({ page }) => {
      await authPage.register(testEmail, testPassword);
      await expect(page).toHaveURL('/');
      await authPage.expectAlertToContain('Account created successfully!');
    });

    test('register test account with existing email', async () => {
      await authPage.register(testEmail, testPassword);
      await authPage.expectAlertToContain('Account already exists!');
    });

    test('log into account', async ({ page }) => {
      await authPage.login(testEmail, testPassword);

      await page.waitForURL('/');
      await expect(page).toHaveURL('/');
      await expect(page.getByPlaceholder('Send a message...')).toBeVisible();
    });
  });
