export class HomePage {
    constructor(page) {
        this.page = page;
            //Locators
        this.buttonLanguageEn = page
            .getByTestId('languages-container')
            .getByLabel('English');

        this.buttonLogin = page.getByRole('button', {
            name: 'Log In'
        });
    }
        //Actions
    async clickLogin() {
        await this.buttonLogin.click();
    }
}