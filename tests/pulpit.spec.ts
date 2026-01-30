import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  // test.describe.configure({ retries: 3 }); //traktować jako ostateczność
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword);
    await page.waitForLoadState('domcontentloaded');
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const recieverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReciever = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    await pulpitPage.transferReceiver.selectOption(recieverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);
    await pulpitPage.transferBtn.click();
    await pulpitPage.actionCloseBtn.click();

    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const recieverNumber = '500 xxx xxx';
    const topUpAmount = '100';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${recieverNumber}`;

    // Act
    await pulpitPage.topUpReceiver.selectOption(recieverNumber);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topUpAgreementCheckbox.click();
    await pulpitPage.topUpExecuteBtn.click();
    await pulpitPage.actionCloseBtn.click();

    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const recieverNumber = '500 xxx xxx';
    const topUpAmount = '100';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act
    await pulpitPage.topUpReceiver.selectOption(recieverNumber);
    await pulpitPage.topUpAmount.fill(topUpAmount);
    await pulpitPage.topUpAgreementCheckbox.click();
    await pulpitPage.topUpExecuteBtn.click();
    await pulpitPage.actionCloseBtn.click();

    // Assert
    await expect(pulpitPage.accountBalance).toHaveText(`${expectedBalance}`);
  });
});
