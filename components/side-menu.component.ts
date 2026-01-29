import { Locator, Page } from "@playwright/test";

export class SideMenuComponent {
    paymentButton: Locator;

    constructor(private page: Page) {
    this.paymentButton = this.page.getByRole('link', { name: 'płatności'}); 
    }
}