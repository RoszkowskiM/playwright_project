import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test(
    'successful login with correct credentials',
    { tag: ['@login', '@smoke'] },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const userPassword = loginData.password;
      const expectedUserName = 'Jan Demobankowy';

      // Act
      await loginPage.login(userId, userPassword);

      // Assert
      const pulpitPage = new PulpitPage(page);
      await expect(pulpitPage.userName).toHaveText(expectedUserName);
    },
  );

  test(
    'unsuccessful login with too short username',
    { tag: '@login' },
    async ({ page }) => {
      // Arrange
      const invalidUserId = 'tester';
      const expectedIdLoginErr = 'identyfikator ma min. 8 znaków';

      // Act
      await loginPage.loginInput.fill(invalidUserId);
      await loginPage.passwordInput.click();

      // Assert
      await expect(loginPage.loginError).toHaveText(expectedIdLoginErr);
    },
  );

  test(
    'unsuccessful login with too short password',
    { tag: '@login' },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const invalidPassword = 'testing';
      const expectedPassLoginErr = `hasło ma min. 8 znaków`;

      // Act
      await loginPage.loginInput.fill(userId);
      await loginPage.passwordInput.fill(invalidPassword);
      await loginPage.passwordInput.blur();

      // Assert
      await expect(loginPage.passwordError).toHaveText(expectedPassLoginErr);
    },
  );
});
