import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = 'Jan Demobankowy';

    // Act
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const invalidUserId = 'tester';
    const expectedIdLoginErr = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(invalidUserId);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedIdLoginErr,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const invalidPassword = 'testing';
    const expectedPassLoginErr = `hasło ma min. 8 znaków`;

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(invalidPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedPassLoginErr,
    );
  });
});
