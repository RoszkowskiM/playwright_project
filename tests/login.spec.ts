import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  const url = 'https://demo-bank.vercel.app/';
  const userId = 'tester11';
  const userPassword = 'testing!';

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const invalidUserId = 'tester';
    const expectedIdLoginErr = 'identyfikator ma min. 8 znaków';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(invalidUserId);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedIdLoginErr,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const invalidPassword = 'testing';
    const expectedPassLoginErr = `hasło ma min. 8 znaków`;

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(invalidPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedPassLoginErr,
    );
  });
});
