import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class ProductDetailPage extends BasePage {
    private readonly txtProductName: Locator;
    private readonly txtProductTotalPrice: Locator;
    private readonly txtProductQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly btnBackToProduct: Locator;
    private readonly btnIncreaseQuantity: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.txtProductName = page.locator('//h1[@data-testid="productdetail-title"]/text()');
        this.txtProductTotalPrice = page.getByTestId(`//span[contains(text(), "${this.translations.product_detail_page.lbl_total}")]/following-sibling::span`);
        this.txtProductQuantity = page.getByTestId('productdetail-pricepd-qty-input');
        this.btnAddToCart = page.getByTestId('pd-add-to-cart');
        this.btnBackToProduct = page.getByRole('link', { name: `${this.translations.product_detail_page.lbl_back_to_product}`, exact: true });
        this.btnIncreaseQuantity = page.getByTestId('pd-qty-inc');
    }

    async getProductName() {
        const productName = await this.txtProductName.textContent();
        return String(productName?.trim());
    }

    async getProductTotalPrice() {
        const priceText = await this.txtProductTotalPrice.innerText();
        const price = priceText.replace(`${this.translations.product_detail_page.product.price.currency}`, '').trim();
        return Number(price);
    }

    async getProductQuantity() {
        const qty = await this.txtProductQuantity.inputValue();
        return Number(qty);
    }

    async selectColorByColorName(name: string) {
        await this.page.locator(`//label[text()="${this.translations.product_detail_page.product.attribute.color.name}"]/parent::div//button[text()="${name}"]`).click();
    }

    async clickAddToCartButton() {
        await this.btnAddToCart.click();
    }

    async clickBackToProductButton() {
        await this.btnBackToProduct.click();
    }

    async clickIncreaseQuntityButton() {
        await this.btnIncreaseQuantity.click();
    }

    async verifyQtyIsMatch(qty: any) {
        await expect(this.txtProductQuantity).toHaveValue(qty.toString());
    }
}
