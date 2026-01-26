import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Payment tests', () => {
  // test.describe.configure({ retries: 3 }); //traktować jako ostateczność

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Successful payment', async ({ page }) => {
    // Arrange
    const transferReciever = 'Jan Nowak';
    const transferAccount = '12 3456 7891 2345 6789 1234 5678';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReciever}`;

    // Act
    await page.getByTestId('transfer_receiver').fill(transferReciever);
    await page.getByTestId('form_account_to').fill(transferAccount);
    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
