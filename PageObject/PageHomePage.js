export class pageHome {
    constructor(page) {
        this.page = page;

        this.buttonLanguageEn =
            page.getByTestId('languages-container').getByLabel('English');

        this.buttonLogin =
            page.getByRole('button', { name: 'Log In' });
    }

    async clickLogin() {
        await this.buttonLogin.click();
    }
}