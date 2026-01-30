import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferAccount: Locator;
  transferBtn: Locator;
  actionCloseBtn: Locator;
  messageText: Locator;
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.transferReceiver = this.page.getByTestId('transfer_receiver');
    this.transferAmount = this.page.getByTestId('form_amount');
    this.transferAccount = this.page.getByTestId('form_account_to');
    this.transferBtn = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.actionCloseBtn = this.page.getByTestId('close-button');
    this.messageText = this.page.locator('#show_messages');
    this.sideMenu = new SideMenuComponent(this.page);
  }
  async makeTransfer(
    transferReciever: string,
    transferAccount: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiver.fill(transferReciever);
    await this.transferAccount.fill(transferAccount);
    await this.transferAmount.fill(transferAmount);
    await this.transferBtn.click();
    await this.actionCloseBtn.click();
  }
}
