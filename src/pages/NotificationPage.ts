import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class NotificationPage extends BasePage {
    private readonly popupMessage: (text: string) => Locator;
    private readonly btnClosePopup: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.btnClosePopup = this.page.locator('div[role="status"] > div ~ button >> nth=0');
        this.popupMessage = (text: string): Locator => this.page.locator(`//div[@role="status"]/div[contains(text(), "${text}")]`);
    }

    async verifyAddToCartSuccess() {
        await expect(this.popupMessage(this.translations.notification_page.add_to_cart_success.msg)).toBeVisible();
        this.clickClosePopup();
    }

    async verifyPaymentSuccess() {
        await expect(this.popupMessage(this.translations.notification_page.payment_success.msg)).toBeVisible();
        this.clickClosePopup();
    }

    async clickClosePopup() {
        await this.btnClosePopup.click();
    }

}
