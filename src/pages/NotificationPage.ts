import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class NotificationPage extends BasePage {
    private readonly popupMessage = (text: string): Locator => this.page.locator(`//div[@role="status"]/div[contains(text(), "${text}")]`);
    private readonly btnClosePopup: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.btnClosePopup = this.page.locator('//div[@role="status"]/div/following-sibling::button');
    }

    async verifyAddToCartSuccess() {
        await expect(this.popupMessage(this.translations.notification_page.add_to_cart_success.msg)).toBeVisible();
        await this.btnClosePopup.click();
    }

    async verifyPaymentSuccess() {
        await expect(this.popupMessage(this.translations.notification_page.payment_success.msg)).toBeVisible();
        await this.btnClosePopup.click();
    }
}
