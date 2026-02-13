export interface AddressData {
    firstName: string;
    lastName: string;
    addressDetails: string;
    proviceId: number;
    proviceName?: string;
    districtId: number;
    districtName?: string;
    subDistrictId: number;
    subDistrictName?: string;
    postalCode?: string;
}