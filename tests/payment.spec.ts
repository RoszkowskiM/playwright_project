import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';
import { SideMenuComponent } from '../components/side-menu.component';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const loginPage = new LoginPage(page);
    const pulpitPage = new PulpitPage(page);
    paymentPage = new PaymentPage(page);

    await page.goto('/');
    await loginPage.login(userId, userPassword);
    await page.waitForLoadState('domcontentloaded');
    await pulpitPage.sideMenu.paymentButton.click();
  });

  test('Successful payment', async ({ page }) => {
    // Arrange
    const transferReciever = 'Jan Nowak';
    const transferAccount = '12 3456 7891 2345 6789 1234 5678';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReciever}`;

    // Act
    await paymentPage.transferReceiver.fill(transferReciever);
    await paymentPage.transferAccount.fill(transferAccount);
    await paymentPage.transferAmount.fill(transferAmount);
    await paymentPage.transferBtn.click();
    await paymentPage.actionCloseBtn.click();

    // Assert
    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});
