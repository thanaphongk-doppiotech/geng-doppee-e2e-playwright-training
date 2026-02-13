import { Page } from '@playwright/test';
import { Translation } from '../data/translations/translation';

export class BasePage {
    constructor(protected readonly page: Page, protected readonly translations: Translation) {
    }
}