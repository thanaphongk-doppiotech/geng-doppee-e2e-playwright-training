import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test';
import { Translation } from '../data/translations/translation';

export class SignUpPage extends BasePage {
    private readonly txtFullName: Locator;
    private readonly txtMobilePhone: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly btnCreateAccount: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.txtFullName = page.locator(`[placeholder="${this.translations.sign_up_page.full_name}"]`);
        this.txtMobilePhone = page.locator('[inputmode="numeric"]');
        this.txtEmail = page.getByTestId('signup-email');
        this.txtPassword = page.getByTestId('signup-password');
        this.txtConfirmPassword = page.getByTestId('signup-confirm');
        // this.btnCreateAccount = page.getByRole('button', { name: 'Create account' });
        this.btnCreateAccount = page.getByTestId('signup-submit');
    }

    async inputFullName(name: string) {
        await this.txtFullName.fill(name);
    }

    async inputMobilePhone(mobilePhone: string) {
        await this.txtMobilePhone.fill(mobilePhone);
    }

    async inputEmail(email: string) {
        await this.txtEmail.fill(email);
    }

    async inputPassword(password: string) {
        await this.txtPassword.fill(password);
    }

    async inputConfirmPassword(confirmPassword: string) {
        await this.txtConfirmPassword.fill(confirmPassword);
    }

    async clickCreateAccountButton() {
        await this.btnCreateAccount.click();
    }
}
