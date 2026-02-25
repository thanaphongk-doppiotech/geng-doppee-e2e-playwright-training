import { App } from "../fixtures/app.fixtures";

export class LoginService {
    constructor(private readonly app: App) { }

    async loginWithEmailAndPassword(email: string, password: string, rememberMe: boolean = true) {
        const { menuBarPage, loginPage, notificationPage } = this.app;

        await menuBarPage.clickAccountButton();
        await menuBarPage.clickSignInButton();
        await loginPage.inputEmail(email);
        await loginPage.inputPassword(password);
        await loginPage.selectRememberMeCheckbox(rememberMe);
        await loginPage.clickSignInButton();
        await notificationPage.clickClosePopup();
    }
}
