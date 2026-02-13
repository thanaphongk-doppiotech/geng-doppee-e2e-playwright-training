import { BasePage } from './BasePage';
import { Page, expect, Locator } from '@playwright/test'
import { Translation } from '../data/translations/translation';

export class OrderConfirmPage extends BasePage {
    private readonly btnPaid: Locator;

    constructor(readonly page: Page, readonly translations: Translation) {
        super(page, translations);
        this.btnPaid = page.getByTestId('payment-confirm-qr');
    }

    async clickPaidButton() {
        await this.btnPaid.click();
    }
}
