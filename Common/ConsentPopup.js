import { expect } from '@playwright/test';

export class consentPopup {
    constructor(page) {
        this.page = page;

        this.consentPopup = page.getByRole('heading', {name: 'This site asks for consent to use your data'});

        this.buttonConsent = page.getByRole('button', {name: 'Consent'});
        
        this.buttonManageOptions = page.getByText('Manage options', {exact: true});

        this.buttonAcceptAll = page.locator("button[class*='fc-data-preferences-accept-all']");
    }

    async clickButtonConsent() {
        if (await this.buttonConsent.isVisible({ timeout: 3000 }).catch(() => false)) {
            await this.buttonConsent.click();
        }
    }

    async clickManageOptions() {
        await expect(this.consentPopup).toBeVisible();
        await this.buttonManageOptions.click();
        await this.buttonAcceptAll.click();
    }
}