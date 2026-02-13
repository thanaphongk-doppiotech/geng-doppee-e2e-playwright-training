import { test as base, expect, Page } from '@playwright/test'

// Pages
import { MenuBarPage } from '../pages/MenuBarPage'
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { NotificationPage } from '../pages/NotificationPage'
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmPage } from '../pages/OrderConfirmPage';

// Services
import { SignUpService } from '../services/SignUpService';
import { ProductDetailService } from '../services/ProductDetailService';
import { CheckoutService } from '../services/CheckoutService';

// Utils
import * as randomUtils from '../utils/RandomUtils';
import * as commonUtils from '../utils/CommonUtils';

// Translation
import { en, th, Translation } from '../data/translations/translation';

export class App {
    private _menuBarPage?: MenuBarPage;
    private _loginPage?: LoginPage;
    private _signUpPage?: SignUpPage;
    private _productListPage?: ProductListPage;
    private _productDetailPage?: ProductDetailPage;
    private _notificationPage?: NotificationPage;
    private _cartPage?: CartPage;
    private _checkoutPage?: CheckoutPage;
    private _orderConfirmPage?: OrderConfirmPage;

    private _signupService?: SignUpService;
    private _productDetailService?: ProductDetailService;
    private _checkoutService?: CheckoutService;

    constructor(readonly page: Page, readonly translations: Translation) {
    }

    get menuBarPage(): MenuBarPage {
        return this._menuBarPage ??= new MenuBarPage(this.page, this.translations);
    }

    get loginPage(): LoginPage {
        return this._loginPage ??= new LoginPage(this.page, this.translations);
    }

    get signUpPage(): SignUpPage {
        return this._signUpPage ??= new SignUpPage(this.page, this.translations);
    }

    get productListPage(): ProductListPage {
        return this._productListPage ??= new ProductListPage(this.page, this.translations);
    }

    get productDetailPage(): ProductDetailPage {
        return this._productDetailPage ??= new ProductDetailPage(this.page, this.translations);
    }

    get notificationPage(): NotificationPage {
        return this._notificationPage ??= new NotificationPage(this.page, this.translations);
    }

    get cartPage(): CartPage {
        return this._cartPage ??= new CartPage(this.page, this.translations);
    }

    get checkoutPage(): CheckoutPage {
        return this._checkoutPage ??= new CheckoutPage(this.page, this.translations);
    }

    get orderConfirmPage(): OrderConfirmPage {
        return this._orderConfirmPage ??= new OrderConfirmPage(this.page, this.translations);
    }

    get signUpService(): SignUpService {
        return this._signupService ??= new SignUpService(this);
    }

    get productDetailService(): ProductDetailService {
        return this._productDetailService ??= new ProductDetailService(this);
    }

    get checkoutService(): CheckoutService {
        return this._checkoutService ??= new CheckoutService(this);
    }
}

type Fixtures = {
    app: App;
    utils: typeof randomUtils;
    commonUtils: typeof commonUtils;
    translations: Translation;
}

export const test = base.extend<Fixtures>({
    app: async ({ page, translations }, use) => {
        await use(new App(page, translations));
    },
    utils: async ({ }, use) => {
        await use(randomUtils);
    },
    commonUtils: async ({ }, use) => {
        await use(commonUtils);
    },
    translations: async ({ }, use) => {
        await use(en);
    },
})
