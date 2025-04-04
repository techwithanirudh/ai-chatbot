// todo: fix
import { generateId } from 'ai';
import { getUnixTime } from 'date-fns';
import { test, expect, type Page } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

const testUsername = process.env.TEST_KEYCLOAK_USERNAME ?? `test-${getUnixTime(new Date())}`;
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

  async register(username: string, password: string) {
    await this.gotoRegister();
    await this.page.getByRole('button', { name: 'Continue with Keycloak' }).click();
    await this.page.getByText("Username or email").waitFor()
    await this.page
      .getByLabel("Username or email")
      .fill(username)
    await this.page.locator("#password").fill(password);
    await this.page.getByRole('button', { name: 'Sign Up' }).click();
    await this.page.waitForURL("http://localhost:3000")
  }

  async login(username: string, password: string) {
    await this.gotoLogin();
    await this.page.getByRole('button', { name: 'Continue with Keycloak' }).click();
    await this.page.getByText("Username or email").waitFor()
    await this.page
      .getByLabel("Username or email")
      .fill(username)
    await this.page.locator("#password").fill(password);
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

    // test('register a test account', async ({ page }) => {
    //   await authPage.register(testUsername, testPassword);
    //   await expect(page).toHaveURL('/');
    //   await authPage.expectAlertToContain('Account created successfully!');
    // });

    // test('register test account with existing email', async () => {
    //   await authPage.register(testUsername, testPassword);
    //   await authPage.expectAlertToContain('Account already exists!');
    // });

    test('log into account', async ({ page }) => {
      await authPage.login(testUsername, testPassword);

      await page.waitForURL('/');
      await expect(page).toHaveURL('/');
      await expect(page.getByPlaceholder('Send a message...')).toBeVisible();
    });
  });
