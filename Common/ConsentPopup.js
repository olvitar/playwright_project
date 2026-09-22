export class consentPopup {

    constructor(page) {
        this.page = page;
    }
    async clickButtonConsent() {
        // Click Consent if the cookie pop-up is displayed
    const consentButton = this.page.locator("xpath=//button[@aria-label='Consent']");
    if (await consentButton.isVisible()) {
        await consentButton.click();
    };
    }
}

//export { consentPopup };