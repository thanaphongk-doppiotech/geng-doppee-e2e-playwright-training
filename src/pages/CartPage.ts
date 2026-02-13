import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class CartPage extends BasePage {
    private readonly chkSelectAll: Locator;
    //div[contains(text(), "Bluetooth Earbuds")]/ancestor::div/following-sibling::div/input[@type="number"]
    //div[contains(text(), "Bluetooth Earbuds")]/ancestor::div/following-sibling::div/span
    //span[contains(text(), "Total")]/following-sibling::span
    // cart-proceed

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.chkSelectAll = page.locator(`//span[contains(text(), "${this.translations.cart_page.lbl_select_all}")]/preceding-sibling::input[@type="checkbox"]`);
    }

    async clickSelectAllCheckbox() {
        await this.chkSelectAll.click();
    }

    async verifyProductIsAdded(name: string) {
        const txtProductName = await this.page.locator(`//div[contains(text(), "${name}")]`);
        expect(txtProductName).toBeVisible();
    }
}
