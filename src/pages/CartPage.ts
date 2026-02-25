import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class CartPage extends BasePage {
    private readonly chkSelectAll: Locator;
    private readonly btnCheckout: Locator;
    private readonly lblShippingPrice: Locator;
    private readonly txtTotalPrice: Locator;
    private readonly txtProductName: (productName: string) => Locator;
    private readonly txtProductQty: (productName: string) => Locator;
    private readonly txtProductPrice: (productName: string) => Locator;
    private readonly listRemoveButton: Locator;
    private readonly btnConfirmRemove: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.chkSelectAll = page.locator(`//span[contains(text(), "${this.translations.cart_page.lbl_select_all}")]/preceding-sibling::input[@type="checkbox"]`);
        this.btnCheckout = page.getByTestId('cart-proceed');
        this.lblShippingPrice = page.locator(`span:text-is("${this.translations.cart_page.lbl_shipping}") + span`);
        this.txtTotalPrice = page.locator(`//span[contains(text(), "${this.translations.cart_page.lbl_total}")]/following-sibling::span`);
        this.txtProductName = (productName: string): Locator => this.page.locator(`//div[contains(text(), "${productName}")]`);
        this.txtProductQty = (productName: string): Locator => this.page.locator(`//div[contains(text(), "${productName}")]/ancestor::div/following-sibling::div/input[@type="number"]`);
        this.txtProductPrice = (productName: string): Locator => this.page.locator(`//div[contains(text(), "${productName}")]/ancestor::div/following-sibling::div/span`);
        this.listRemoveButton = page.locator('[id^="btn-remove-"]');
        this.btnConfirmRemove = page.locator('p + div > .btn-ghost + .btn-danger');
    }

    async clickSelectAllCheckbox(isCheck: boolean = true) {
        await this.chkSelectAll.setChecked(isCheck);
    }

    async verifyProductIsAdded(name: string) {
        await expect(this.txtProductName(name)).toBeVisible();
    }

    async verifyProductQuantityIsMatch(name: string, quantity: string) {
        await expect(this.txtProductQty(name)).toHaveValue(quantity);
    }

    async verifyProductPriceIsMatch(name: string, price: any) {
        await expect(this.txtProductPrice(name)).toContainText(price);
    }

    async getShippingPrice() {
        const shippingPriceText = await this.lblShippingPrice.innerText();
        const shippingPrice = shippingPriceText.replace(`${this.translations.product_detail_page.product.price.currency}`, '').trim();
        return shippingPrice;
    }

    async verifyTotalPriceIsMatch(price: string) {
        await expect(this.txtTotalPrice).toContainText(price);
    }

    async clickCheckoutButton() {
        await this.btnCheckout.click();
    }

    async getRemoveButtonElements() {
        return this.listRemoveButton;
    }

    async clickConfirmRemoveButton() {
        await this.btnConfirmRemove.click();
    }

}
