import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class MenuBarPage extends BasePage {
    private readonly btnAccount: Locator;
    private readonly btnSignIn: Locator;
    private readonly btnCart: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.btnAccount = page.getByTestId('nav-account-button');
        this.btnSignIn = page.getByTestId('nav-account-signin');
        this.btnCart = page.locator('#btn-cart[aria-label="Cart"]');
    }

    async clickAccountButton() {
        await this.btnAccount.click();
    }

    async clickSignInButton() {
        await this.btnSignIn.click();
    }

    async clickCartButton() {
        await this.btnCart.click();
    }
}