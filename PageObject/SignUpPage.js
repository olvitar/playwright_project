export class SignUpPage {
    constructor(page) {
        this.page = page;

        this.buttonLoginSignUp = page.getByRole('button', {
            name: 'Already a member? Log In'
        });
    }

    async clickLogin() {
        await this.buttonLoginSignUp.click();
    }
}