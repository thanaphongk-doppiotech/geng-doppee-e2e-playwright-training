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
    private readonly btnColorAttributeByName: (attrName: string) => Locator;
    private readonly lblProductPrice: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.txtProductName = page.getByTestId('productdetail-title');
        this.txtProductTotalPrice = page.locator(`//span[contains(text(), "${this.translations.product_detail_page.lbl_total}")]/following-sibling::span`);
        this.txtProductQuantity = page.getByTestId('pd-qty-input');
        this.btnAddToCart = page.getByTestId('pd-add-to-cart');
        this.btnBackToProduct = page.locator(`//a[@href="/products" and contains(text(), "${this.translations.product_detail_page.lbl_back_to_product}")]`);
        // FIXME
        // - getByRole not work?
        // this.btnBackToProduct = page.getByRole('link', { name: this.translations.product_detail_page.lbl_back_to_product});
        this.btnIncreaseQuantity = page.getByTestId('pd-qty-inc');
        this.btnColorAttributeByName = (attrName: string) => this.page.locator(`//label[text()="${this.translations.product_detail_page.product.attribute.color.name}"]/parent::div//button[text()="${attrName}"]`);
        this.lblProductPrice = page.locator('[data-testid="productdetail-price"]');
    }

    async getProductName() {
        const productName = await this.txtProductName.evaluate(el => el.firstChild?.textContent?.trim());
        return String(productName);
    }

    async getProductTotalPrice() {
        const totalPriceText = await this.txtProductTotalPrice.innerText();
        const totalPrice = totalPriceText.replace(`${this.translations.product_detail_page.product.price.currency}`, '').trim();
        return totalPrice;
    }

    async getProductPrice() {
        const priceText = await this.lblProductPrice.innerText();
        const price = priceText.replace(`${this.translations.product_detail_page.product.price.currency}`, '').trim();
        return price;
    }

    async getProductQuantity() {
        const qty = await this.txtProductQuantity.inputValue();
        return qty;
    }

    async selectColorByColorName(colorName: string) {
        await this.btnColorAttributeByName(colorName).click();
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
