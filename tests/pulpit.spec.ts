import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  // test.describe.configure({ retries: 3 }); //traktować jako ostateczność

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userID = 'tester11';
    const userPassword = 'testing!';

    const recieverID = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReciever = 'Chuck Demobankowy';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_transfer_receiver').selectOption(recieverID);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    // await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester11');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('100');
    await page.locator('#uniform-widget_1_topup_agreement > span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 100,00PLN na numer 500 xxx xxx',
    );
    await expect(page.getByTestId('message-text')).toHaveText(
      'Doładowanie wykonane! 100,00PLN na numer 500 xxx xxx',
    );
  });
  // Moje dupowate próby pisania asercji na dupowatych lokatorach
  // test('menu elements presence', async ({ page }) => {
  //     await page.goto('https://demo-bank.vercel.app/');
  //     await page.getByTestId('login-input').fill('tester11');
  //     await page.getByTestId('password-input').fill('password');
  //     await page.getByTestId('login-button').click();
  //     await page.waitForLoadState("domcontentloaded");
  //     await expect(page.getByRole('link', { name: 'mój pulpit' })).toHaveText('mój pulpit');
  //     await expect(page.getByRole('link', { name: 'szybki przelew' })).toHaveText('szybki przelew');
  //     await expect(page.getByRole('link', { name: 'doładowanie telefonu' })).toHaveText('doładowanie telefonu');
  //     await page.getByText('(41 4100 1111 1111 1111 1111').click();
  //     await expect(page.locator('#widget_1_transfer_amount')).toBeEmpty();
  //     await expect(page.locator('#widget_1_transfer_amount')).toBeEditable();
  //     await expect(page.getByRole('heading', { name: 'ostatnie operacje' })).toBeVisible();
  // });
});
