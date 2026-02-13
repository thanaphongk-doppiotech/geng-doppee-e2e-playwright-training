import { App } from "../fixtures/app.fixtures";
import { AddressData } from "../components/AddressData";

export class CheckoutService {
    constructor(private readonly app: App) { }

    async createNewAddress(addressData: AddressData) {
        const { checkoutPage } = this.app;
        checkoutPage.inputFirstName(addressData.firstName);
        checkoutPage.inputLastName(addressData.lastName);
        checkoutPage.inputAddressDetail(addressData.addressDetails);
        checkoutPage.selectProvinceByIndex(addressData.proviceId);
        checkoutPage.selectSubDistrict(addressData.districtId);
        checkoutPage.selectSubDistrict(addressData.subDistrictId);
    }
}
