import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class LoginPage extends BasePage {
    private readonly btnCreateAccount: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly chkRememberMe: Locator;
    private readonly btnSignIn: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.btnCreateAccount = page.locator('[href="/signup"]');
        this.txtEmail = page.locator('[type="email"]');
        this.txtPassword = page.locator('[data-testid="signin-password"]');
        this.chkRememberMe = page.locator('[data-testid="signin-remember"]');
        this.btnSignIn = page.locator('[data-testid="signin-submit"]');
    }

    async clickCreateAccountButton() {
        await this.btnCreateAccount.click();
    }

    async inputEmail(email: string) {
        await this.txtEmail.fill(email);
    }

    async inputPassword(password: string) {
        await this.txtPassword.fill(password);
    }

    async selectRememberMeCheckbox(rememberMe: boolean = true) {
        await this.chkRememberMe.setChecked(rememberMe);
    }

    async clickSignInButton() {
        await this.btnSignIn.click();
    }

}