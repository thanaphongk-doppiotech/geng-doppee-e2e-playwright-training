import { APIRequest, APIRequestContext, expect } from "@playwright/test";
import { AddressApiData } from "../components/AddressApiData";

export async function getAddress(apiContext: APIRequestContext) {
    const res = await apiContext.get('/api/addresses');
    expect(res.ok()).toBeTruthy();
    return res.json();
}

export function verifyAddressIsEmpty(addressData: any): boolean {
    const addresses = addressData.addresses ?? [];
    return addresses.length <= 0;
}

export async function createAddress(apiContext: APIRequestContext, addressApiData: AddressApiData) {
    const res = await apiContext.post('/api/addresses', {
        data: addressApiData
    });
    expect(res.ok()).toBeTruthy();
    return res.json();
}
