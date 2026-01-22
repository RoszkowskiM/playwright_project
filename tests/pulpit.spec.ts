import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  // test.describe.configure({ retries: 3 }); //traktować jako ostateczność

  const url = 'https://demo-bank.vercel.app/';
  const userId = 'tester11';
  const userPassword = 'testing!';

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const recieverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReciever = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_transfer_receiver').selectOption(recieverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    // await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const recieverNumber = '500 xxx xxx';
    const topUpAmount = '100';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${recieverNumber}`;

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_topup_receiver').selectOption(recieverNumber);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement > span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    await expect(page.getByTestId('message-text')).toHaveText(expectedMessage);
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
