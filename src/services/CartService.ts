import { App } from "../fixtures/app.fixtures";

export class CartService {
    constructor(private readonly app: App) { }

    async removeAllItemInCart() {
        const { cartPage, menuBarPage, notificationPage } = this.app;
        await menuBarPage.clickCartButton();
        const removeButtonElements = await cartPage.getRemoveButtonElements();
        const totalButtons = await removeButtonElements.count();
        if (totalButtons < 1) return;
        for (let i = 0; i < totalButtons; i++) {
            removeButtonElements.nth(0).click();
            await cartPage.clickConfirmRemoveButton();
            await notificationPage.clickClosePopup();
        }
    }
}
