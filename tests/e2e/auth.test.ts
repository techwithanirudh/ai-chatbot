import { test, expect, type Page } from '@playwright/test';
import { generateId } from 'ai';
import { getUnixTime } from 'date-fns';

test.use({ storageState: { cookies: [], origins: [] } });

const [testFirstName, testLastName] = ['John', 'Doe'];
const testUsername = `test-${getUnixTime(new Date())}`;
const testEmail = `${testUsername}@playwright.com`;
const testPassword = generateId(16);

class AuthPage {
  constructor(private page: Page) {}

  async gotoLogin() {
    await this.page.goto('/login');
    await expect(this.page.getByRole('heading')).toContainText('Welcome Back');
  }

  async gotoRegister() {
    await this.page.goto('/register');
    await expect(this.page.getByRole('heading')).toContainText(
      'Create an account',
    );
  }

  async register(username: string, password: string) {
    await this.gotoRegister();

    await this.page
      .getByRole('button', { name: 'Continue with Keycloak' })
      .click();
    await this.page.getByText('Username or email').waitFor();
    await this.page.getByRole('link', { name: 'Register' }).click();
    await this.page.locator('#username').fill(testEmail);
    await this.page.locator('#password').fill(testPassword);
    await this.page.locator('#password-confirm').fill(testPassword);
    await this.page.locator('#email').fill(testEmail);
    await this.page.locator('#firstName').fill(testFirstName);
    await this.page.locator('#lastName').fill(testLastName);

    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async login(email: string, password: string) {
    await this.gotoLogin();

    await this.page
      .getByRole('button', { name: 'Continue with Keycloak' })
      .click();
    await this.page.getByText('Username or email').waitFor();
    await this.page.getByLabel('Username or email').fill(email);
    await this.page.locator('#password').fill(password);

    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async expectAlertToContain(text: string) {
    await expect(this.page.locator('#input-error-email')).toContainText(text);
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
      await expect(page).toHaveURL((url) => {
        const pathname = url.pathname;
        return pathname === '/';
      });
      await authPage.expectAlertToContain('Account created successfully!');
    });

    test('register test account with existing email', async () => {
      await authPage.register(testEmail, testPassword);
      await authPage.expectAlertToContain('Email already exists.');
    });

    test('log into account', async ({ page }) => {
      await authPage.login(testEmail, testPassword);

      await page.waitForURL((url) => {
        const pathname = url.pathname;
        return pathname === '/';
      });
      await expect(page).toHaveURL((url) => {
        const pathname = url.pathname;
        return pathname === '/';
      });
      await expect(page.getByPlaceholder('Send a message...')).toBeVisible();
    });
  });
