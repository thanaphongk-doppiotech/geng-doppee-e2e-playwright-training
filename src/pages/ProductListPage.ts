import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class ProductListPage extends BasePage {
    private readonly ddlCategory: Locator;
    private readonly btnApply: Locator;
    private readonly txtSearch: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.ddlCategory = page.getByTestId('products-filter-category');
        this.btnApply = page.locator('#btn-apply-filters');
        this.txtSearch = page.getByTestId('products-search-input');
    }

    async selectCategoryByName(categoryName: string) {
        await this.ddlCategory.selectOption(categoryName);
    }

    async clickApplyButton() {
        await this.btnApply.click();
    }

    async clickViewDetailsByProductName(productName: string) {
        const lnkProduct = this.page.locator(`//a[contains(text(), "${productName}")]/parent::div/following-sibling::div/button`);
        lnkProduct.hover();
        lnkProduct.click();
    }

    async inputSearch(text: string) {
        await this.txtSearch.fill(text);
    }

}
