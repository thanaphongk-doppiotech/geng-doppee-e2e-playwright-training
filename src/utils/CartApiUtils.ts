import { APIRequest, APIRequestContext, expect } from "@playwright/test";

export async function getCart(apiContext: APIRequestContext) {
    const res = await apiContext.get('/api/cart', {});
    expect(res.ok()).toBeTruthy();
    return res.json();
}

export async function removeItem(apiContext: APIRequestContext, itemId: string) {
    const res = await apiContext.delete(`/api/cart/${itemId}`);
    expect(res.ok()).toBeTruthy();
}

export async function addProductById(apiContext: APIRequestContext, productId: string, quantity: string) {
    const res = await apiContext.post(`/api/cart`, {
        data: { product_id: productId, quantity: quantity }
    });
    expect(res.ok()).toBeTruthy();
    return res.json();
}
