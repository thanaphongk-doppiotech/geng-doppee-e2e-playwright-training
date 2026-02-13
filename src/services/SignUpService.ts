import { App } from "../fixtures/app.fixtures";

export class SignUpService {
    constructor(private readonly app: App) { }

    async registerWithGenerateEmail(name: string, mobilePhone: string, email: string, password: string, confirmPassword: string) {
        const { menuBarPage, loginPage, signUpPage } = this.app;

        await menuBarPage.clickAccountButton();
        await menuBarPage.clickSignInButton();
        await loginPage.clickCreateAccountButton();
        await signUpPage.inputFullName(name);
        await signUpPage.inputMobilePhone(mobilePhone);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(confirmPassword);
        await signUpPage.clickCreateAccountButton();
    }
}
