import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class LoginPage extends BasePage {
    private readonly btnCreateAccount: Locator;
    private readonly txtEmail: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.btnCreateAccount = page.locator('[href="/signup"]');
        this.txtEmail = page.locator('[type="email"]');
    }

    async clickCreateAccountButton() {
        await this.btnCreateAccount.click();
    }
}