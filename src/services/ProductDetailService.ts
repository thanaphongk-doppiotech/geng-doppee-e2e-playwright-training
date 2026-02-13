import { App } from "../fixtures/app.fixtures";
import { expect } from '@playwright/test';

export class ProductDetailService {
    constructor(private readonly app: App) {
    }

    async increaseQuantity(qty: any) {
        const { productDetailPage } = this.app
        const currentQty = await productDetailPage.getProductQuantity();
        const clicksNeeded = Number(qty) - currentQty;
        for (let i = 0; i < clicksNeeded; i++) {
            await productDetailPage.clickIncreaseQuntityButton();
        }
        await productDetailPage.verifyQtyIsMatch(qty);
    }

}