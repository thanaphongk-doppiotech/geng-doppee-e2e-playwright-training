import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class NotificationPage extends BasePage {
    private readonly popupMessage = (text: string): Locator => this.page.locator(`//div[role="status"]//div[contains(text(), "${text}")]`);

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
    }

    async verifyAddToCartSuccess() {
        await expect(this.popupMessage(this.translations.notification_page.add_to_cart_success.msg)).toBeVisible();
    }

    async verifyPaymentSuccess() {
        await expect(this.popupMessage(this.translations.notification_page.payment_success.msg)).toBeVisible();
    }
}
