import { APIRequest, APIRequestContext, expect } from "@playwright/test";

export async function placeOrder(apiContext: APIRequestContext, cartItemIds: number[]) {
    const res = await apiContext.post('/api/orders/place', {
        data: { cart_item_ids: cartItemIds },
    });
    expect(res.ok()).toBeTruthy();
    return res.json();
}
