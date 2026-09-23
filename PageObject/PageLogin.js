export class pageLogin {

    constructor(page) {
        this.page = page;
        // Define the XPath as properties here
        this.buttonLanguageEn = 'xpath=//button[@aria-label="English" and @aria-current="true"]';
        this.buttonLoginHeader = 'xpath=//span[text()="Log In"]';
        this.fieldEmail = 'xpath=//input[@type="email"]';
        this.fieldPassword = 'xpath=//input[@type="password"]';
        this.buttonLogin = 'xpath=//button[@aria-label="Log In" and @data-testid="buttonElement"]';

    }
}