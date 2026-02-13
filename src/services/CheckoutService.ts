import { App } from "../fixtures/app.fixtures";
import { AddressData } from "../components/AddressData";

export class CheckoutService {
    constructor(private readonly app: App) { }

    async createNewAddress(addressData: AddressData) {
        const { checkoutPage } = this.app;
        checkoutPage.clickAddNewAddress();
        await checkoutPage.page.waitForTimeout(500);
        checkoutPage.inputFirstName(addressData.firstName);
        await checkoutPage.page.waitForTimeout(500);
        checkoutPage.inputLastName(addressData.lastName);
        await checkoutPage.page.waitForTimeout(500);
        checkoutPage.inputAddressDetail(addressData.addressDetails);
        checkoutPage.selectProvinceByName(addressData.proviceName!);
        checkoutPage.selectDistrictByIndex(addressData.districtId);
        checkoutPage.selectSubDistrictByIndex(addressData.subDistrictId);
        checkoutPage.clickSaveAddressButton();
        await checkoutPage.page.waitForTimeout(500);
    }
}
