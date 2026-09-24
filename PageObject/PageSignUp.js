export class pageSignUp {
    constructor(page) {
        this.page = page;
        this.buttonLoginSignUp = page.getByRole('button', { name: 'Log In' });
    }

    async clickLogin() {
        await this.buttonLoginSignUp.click();
    }
}