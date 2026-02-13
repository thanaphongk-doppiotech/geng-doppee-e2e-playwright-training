import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class CheckoutPage extends BasePage {
    private readonly btnAddNewAddress: Locator;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtAddressDetail: Locator;
    private readonly ddlProvince: Locator;
    private readonly ddlDistrict: Locator;
    private readonly ddlSubDistrict: Locator;
    private readonly btnSaveAddress: Locator;
    private readonly chkQrCodePay: Locator;
    private readonly btnPlaceOrder: Locator;

    private readonly txtProductName = (name: string): Locator => this.page.locator(`//div[contains(text(), "${name}")]`);

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.btnAddNewAddress = page.getByTestId('checkout-add-address-toggle');
        this.txtFirstName = page.getByTestId('checkout-form-first-name');
        this.txtLastName = page.getByTestId('checkout-form-last-name');
        this.txtAddressDetail = page.getByTestId('checkout-form-detail');
        this.ddlProvince = page.getByTestId('checkout-form-province');
        this.ddlDistrict = page.getByTestId('checkout-form-district');
        this.ddlSubDistrict = page.getByTestId('checkout-form-subdistrict');
        this.btnSaveAddress = page.getByTestId('checkout-form-save');
        this.chkQrCodePay = page.getByTestId('checkout-pay-qr');
        this.btnPlaceOrder = page.getByTestId('checkout-place-order');
    }

    async clickAddNewAddress() {
        await this.btnAddNewAddress.click();
    }

    async inputFirstName(firstName: string) {
        await this.txtFirstName.fill(firstName);
    }

    async inputLastName(lastName: string) {
        await this.txtLastName.fill(lastName);
    }

    async inputAddressDetail(addressDetail: string) {
        await this.txtAddressDetail.fill(addressDetail);
    }

    async selectProvinceByIndex(index: number = 0) {
        await this.ddlProvince.selectOption({ index });
    }

    async selectDistrictByIndex(index: number = 0) {
        await this.ddlDistrict.selectOption({ index });
    }

    async selectSubDistrict(index: number = 0) {
        await this.ddlSubDistrict.selectOption({ index });
    }

    async clickSaveAddressButton() {
        await this.btnSaveAddress.click();
    }

    async selectQrCodePayment() {
        await this.chkQrCodePay.click();
    }

    async clickPlaceOrderButton() {
        await this.btnPlaceOrder.click();
    }
}
