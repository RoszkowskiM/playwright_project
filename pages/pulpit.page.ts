import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  transferBtn: Locator;
  actionCloseBtn: Locator;
  messageText: Locator;
  topUpReceiver: Locator;
  topUpAmount: Locator;
  topUpAgreementCheckbox: Locator;
  topUpExecuteBtn: Locator;
  accountBalance: Locator;
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.transferBtn = this.page.locator('#execute_btn');
    this.actionCloseBtn = this.page.getByTestId('close-button');
    this.messageText = this.page.locator('#show_messages');
    this.topUpReceiver = this.page.locator('#widget_1_topup_receiver');
    this.topUpAmount = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement > span',
    );
    this.topUpExecuteBtn = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.accountBalance = this.page.locator('#money_value');
    this.sideMenu = new SideMenuComponent(this.page);
  }
}
