import { test, expect } from '@playwright/test';
import { URLs } from '../Common/URLs';
import { consentPopup } from '../Common/ConsentPopup';
import { HomePage } from '../PageObjects/HomePage';
import { LoginPage } from '../PageObjects/LoginPage';
import { SignUpPage } from '../PageObjects/SignUpPage';
import { testData } from '../Common/TestData';


// Helper: navigate to the Login form
async function openLoginForm(page) {

    await page.goto(URLs.pageLinkHomePage);

    // Click on the Consent button on Cookie pop-up
    const consentPopupWindow = new consentPopup(page);
    await consentPopupWindow.clickButtonConsent();

    // Wait until the language selector is displayed
    const homePage = new HomePage(page);
    await homePage.buttonLanguageEn.waitFor();

    // Click Login button in the header
    await homePage.clickLogin();

    // Click Login button on the Signup page
    const signUpPage = new SignUpPage(page);
    await signUpPage.clickLogin();
}


// 1. Login with an empty login form
test('Login with an empty login form', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new LoginPage(page);

    // Click Login without entering email or password
    await loginPage.buttonLogin.click();

    // Assert that the Email validation message
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
    // Assert that the Password validation message
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});


// 2. Login with an empty email
test('Login with an empty email', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new LoginPage(page);

    // Enter valid password
    await loginPage.fieldPassword.fill(testData.userLogin.passwordValid);

    // Leave Email empty and click Login
    await loginPage.buttonLogin.click();

    // Assert that the Email field is invalid
    await expect(page.getByLabel('Email')).toHaveJSProperty('validity.valid', false);
    // Assert that the Email validation message
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
});


// 3. Login with an empty password
test('Login with an empty password', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new LoginPage(page);

    // Enter valid email
    await loginPage.fieldEmail.fill(testData.userLogin.emailValid);

    // Leave Password empty and click Login
    await loginPage.buttonLogin.click();

    // Assert that the Password field is invalid
    await expect(page.getByLabel('Password')).toHaveJSProperty('validity.valid', false);
    // Assert that the Password validation message
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});


// 4. Login with an invalid email format
test('Login with an invalid email format', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new LoginPage(page);

    // Enter invalid email format
    await loginPage.fieldEmail.waitFor();
    await loginPage.fieldEmail.fill(testData.userLogin.emailInvalidFormat);

    // Enter valid password
    await loginPage.fieldPassword.fill(testData.userLogin.passwordValid);

    // Click Login
    await loginPage.buttonLogin.click();

    // Assert that the Email field is invalid
    await expect(page.getByLabel('Email')).toHaveJSProperty('validity.valid', false);
    // Assert that the Email validation message
    await expect(page.getByText('Double check your email and try again.')).toBeVisible();
});


// 5. Login with an incorrect password
test('Login with an incorrect password', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new LoginPage(page);

    // Enter valid email
    await loginPage.fieldEmail.waitFor();
    await loginPage.fieldEmail.fill(testData.userLogin.emailValid);

    // Enter incorrect password
    await loginPage.fieldPassword.fill(testData.userLogin.passwordInvalid);

    // Click Login
    await loginPage.buttonLogin.click();

    // Assert that the Password validation message
    await expect(page.getByText('Wrong email or password')).toBeVisible();
});


// 6. Login with a non-existent user email
test('Login with a non-existent user email', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new LoginPage(page);

    // Enter non-existent email
    await loginPage.fieldEmail.waitFor();
    await loginPage.fieldEmail.fill(testData.userLogin.emailNonExistent);

    // Enter valid password
    await loginPage.fieldPassword.fill(testData.userLogin.passwordValid);

    // Click Login
    await loginPage.buttonLogin.click();

    // Assert that the Password validation message
    await expect(page.getByText("This email doesn't match any account. Try again.")).toBeVisible();
});