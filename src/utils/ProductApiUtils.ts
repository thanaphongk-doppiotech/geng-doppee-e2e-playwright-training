import { APIRequest, APIRequestContext, expect } from "@playwright/test";

export async function getAllProducts(apiContext: APIRequestContext) {
    const res = await apiContext.get('/api/products', {});
    expect(res.ok()).toBeTruthy();
    return res.json();
}

export async function getProductListByNameAndCategory(apiContext: APIRequestContext, name: string, category: string) {
    const res = await apiContext.get(`/api/products?q=${name}&category=${category}`);
    expect(res.ok()).toBeTruthy();
    return res.json();
}

export async function getProductDetailByProductId(apiContext: APIRequestContext, productId: string) {
    const res = await apiContext.get(`/api/products/${productId}`);
    expect(res.ok()).toBeTruthy();
    return res.json();
}

export function filterAvailableProduct(productData: any): any {
    const availableMouseProducts = productData.products.filter((p: any) => p.stock_qty > 0);

    if (availableMouseProducts === 0) {
        throw new Error('There are no available product');
    }

    return availableMouseProducts;
}
