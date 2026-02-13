import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class CartPage extends BasePage {
    private readonly chkSelectAll: Locator;
    private readonly btnCheckout: Locator;
    private readonly txtTotalPrice: Locator;
    private readonly txtProductName = (name: string): Locator => this.page.locator(`//div[contains(text(), "${name}")]`);
    private readonly txtProductQty = (name: string): Locator => this.page.locator(`//div[contains(text(), "${name}")]/ancestor::div/following-sibling::div/input[@type="number"]`);
    private readonly txtProductPrice = (name: string): Locator => this.page.locator(`//div[contains(text(), "${name}")]/ancestor::div/following-sibling::div/span`);

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.chkSelectAll = page.locator(`//span[contains(text(), "${this.translations.cart_page.lbl_select_all}")]/preceding-sibling::input[@type="checkbox"]`);
        this.btnCheckout = page.getByTestId('cart-proceed');
        this.txtTotalPrice = page.locator(`//span[contains(text(), "${this.translations.cart_page.lbl_total}")]/following-sibling::span`);
    }

    async clickSelectAllCheckbox() {
        await this.chkSelectAll.click();
    }

    async verifyProductIsAdded(name: string) {
        await expect(this.txtProductName(name)).toBeVisible();
    }

    async verifyProductQuantityIsMatch(name: string, quantity: string) {
        await expect(this.txtProductQty(name)).toHaveValue(quantity);
    }

    async verifyProductPriceIsMatch(name: string, price: string) {
        await expect(this.txtProductPrice(name)).toContainText(price);
    }

    async verifyTotalPriceIsMatch(price: string) {
        await expect(this.txtTotalPrice).toContainText(price);
    }

    async clickCheckoutButton() {
        await this.btnCheckout.click();
    }
}
