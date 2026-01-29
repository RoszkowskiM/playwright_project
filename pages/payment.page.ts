import { Locator, Page } from '@playwright/test';

export class PaymentPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferAccount: Locator;
  transferBtn: Locator;
  actionCloseBtn: Locator;
  messageText: Locator;

  constructor(private page: Page) {
    this.transferReceiver = this.page.getByTestId('transfer_receiver');
    this.transferAmount = this.page.getByTestId('form_amount');
    this.transferAccount = this.page.getByTestId('form_account_to');
    this.transferBtn = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.actionCloseBtn = this.page.getByTestId('close-button');
    this.messageText = this.page.locator('#show_messages');
  }
}
