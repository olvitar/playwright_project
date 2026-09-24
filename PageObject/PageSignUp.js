export class SignUpPage {

    constructor(page) {
        this.page = page;
        // Define the XPath as properties here
        this.buttonLoginSignUp = page.getByRole('button', { name: 'Log In' });
    }
    async clickLogin() {
    await this.buttonLoginSignUp.click();
    }   
}