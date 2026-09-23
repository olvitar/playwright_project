import { expect } from "@playwright/test";

export class consentPopup {

    constructor(page) {
        this.page = page;
        // Define XPath selectors as properties
        this.consentPopup = "xpath=//h1[text()='This site asks for consent to use your data']";
        this.buttonConsent ="xpath=//button[@aria-label='Consent']";
        this.buttonManageOptions ="xpath=//p[text()='Manage options']";
        this.buttonAcceptAll = "xpath=//button[contains(@class, 'fc-data-preferences-accept-all')]"; 
    }
    async clickButtonConsent() {
        // Click Consent if the cookie pop-up is displayed
    const consentButton = this.page.locator(this.buttonConsent);
    if (await consentButton.isVisible()) {
        await consentButton.click();
    };
    }

    async clickManageOptions() {
        //Wait for the consent popup to be visible
    await expect(this.page.locator(this.consentPopup)).toBeVisible();

        //Click on the 'Manage options' button
    const buttonManageOptions = this.page.locator(this.buttonManageOptions);
    await buttonManageOptions.click();
    const buttonAcceptAll = this.page.locator(this.buttonAcceptAll);
    await buttonAcceptAll.click();
    }
}

//export { consentPopup };