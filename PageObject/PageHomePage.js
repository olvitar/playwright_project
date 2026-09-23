export class pageHome {

    constructor(page) {
        this.page = page;
        // Define the XPath as properties here
        this.buttonLanguageEn = page.getByTestId('languages-container').getByLabel('English');
        //this.buttonLogin = 'xpath=//span[text()='Log In']';

    }
}

