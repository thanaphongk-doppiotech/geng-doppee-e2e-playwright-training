import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class NotificationPage extends BasePage {
    private readonly msgAddToCartSuccess: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.msgAddToCartSuccess = page.locator(`//div[role="status"]:has-text("${this.translations.notification_page.add_to_cart_success.msg}")`);
    }

    async verifyAddToCartSuccess() {
        await expect(this.msgAddToCartSuccess).toBeVisible();
    }
}