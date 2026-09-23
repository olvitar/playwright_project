import { expect } from '@playwright/test';

export class pageLogin {
    constructor(page) {
        this.page = page;
        // Define the XPath as properties here
        //this.buttonLanguageEn = 'xpath=//button[@aria-label="English" and @aria-current="true"]';
        this.buttonLoginHeader = page.getByRole('button', { name: 'Log In' });
        this.fieldEmail = page.locator('xpath=//input[@type="email"]');
        this.fieldPassword = page.locator('xpath=//input[@type="password"]');
        this.buttonLogin = page.locator('form').getByRole('button', { name: 'Log In' });
 
        // Error messages
        this.errorInvalidEmail = page.getByText('Double check your email and try again.');
        this.errorEmptyEmail = page.getByText('Email cannot be blank');
        this.errorEmptyPassword = page.getByText('Make sure you enter a password.');
        this.errorIncorrectCredentials = page.getByText('Wrong email or password');
        this.errorNonExistentEmail = page.getByText("This email doesn't match any account. Try again.");   
        }

    async enterEmail(email) {
        await this.fieldEmail.fill(email);
    }

    async enterPassword(password) {
        await this.fieldPassword.fill(password);
    }

    async clickLogin() {
        await this.buttonLogin.click();
    }

    async clickHeaderLogin() {
    await this.buttonLoginHeader.click();
    }

    async expectInvalidEmailError() {
        await expect(this.errorInvalidEmail).toBeVisible();
    }

    async expectEmptyEmailError() {
        await expect(this.errorEmptyEmail).toBeVisible();
    }

    async expectEmptyPasswordError() {
        await expect(this.errorEmptyPassword).toBeVisible();
    }

    async expectIncorrectCredentialsError() {
        await expect(this.errorIncorrectCredentials).toBeVisible();
    }

    async expectNonExistentEmailError() {
        await expect(this.errorNonExistentEmail).toBeVisible();
    }
}
