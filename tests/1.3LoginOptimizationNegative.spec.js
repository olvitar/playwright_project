import { test, expect } from '@playwright/test';
import { URLs } from '../Common/URLs';
import { consentPopup } from '../Common/ConsentPopup';
import { pageHome } from '../PageObject/PageHomePage';
import { pageLogin } from '../PageObject/PageLogin';
import { pageSignUp } from '../PageObject/PageSignUp';
import { testData } from '../Common/TestData';


// Helper: navigate to the Login form
async function openLoginForm(page) {

    await page.goto(URLs.pageLinkHomePage);

    // Click on the Consent button on Cookie pop-up
    const consentPopupWindow = new consentPopup(page);
    await consentPopupWindow.clickButtonConsent();

    // Wait until the language selector is displayed
    const homePage = new pageHome(page);
    const buttonLanguage = page.locator(homePage.buttonLanguageEn);
    await buttonLanguage.waitFor();

    // Click Login button in the header
    const loginPage = new pageLogin(page);
    const buttonLoginHeader = page.locator(loginPage.buttonLoginHeader);
    await buttonLoginHeader.click();

    // Click Login button on the Signup page
    const signUpPage = new pageSignUp(page);
    const buttonLoginSignUp = page.locator(signUpPage.buttonLoginSignUp);
    await buttonLoginSignUp.click();
}


// 1. Login with an empty login form
test('Login with an empty login form', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new pageLogin(page);

    // Click Login without entering email or password
    const buttonLogin = page.locator(loginPage.buttonLogin);
    await buttonLogin.click();

    // Assert that the Email validation message
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
    // Assert that the Password validation message
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});


// 2. Login with an empty email
test('Login with an empty email', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new pageLogin(page);

    // Enter valid password
    const fieldPassword = page.locator(loginPage.fieldPassword);
    await fieldPassword.fill(testData.userLogin.passwordValid);

    // Leave Email empty and click Login
    const buttonLogin = page.locator(loginPage.buttonLogin);
    await buttonLogin.click();

    // Assert that the Email field is invalid
    await expect(page.getByLabel('Email')).toHaveJSProperty('validity.valid', false);
    // Assert that the Email validation message
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
});


// 3. Login with an empty password
test('Login with an empty password', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new pageLogin(page);

    // Enter valid email
    const fieldEmail = page.locator(loginPage.fieldEmail);
    await fieldEmail.fill(testData.userLogin.emailValid);

    // Leave Password empty and click Login
    const buttonLogin = page.locator(loginPage.buttonLogin);
    await buttonLogin.click();

    // Assert that the Password field is invalid
    await expect(page.getByLabel('Password')).toHaveJSProperty('validity.valid', false);
    // Assert that the Password validation message
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});


// 4. Login with an invalid email format
test('Login with an invalid email format', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new pageLogin(page);

    // Enter invalid email format
    const fieldEmail = page.locator(loginPage.fieldEmail);
    await fieldEmail.waitFor();
    await fieldEmail.fill(testData.userLogin.emailInvalidFormat);

    // Enter valid password
    const fieldPassword = page.locator(loginPage.fieldPassword);
    await fieldPassword.fill(testData.userLogin.passwordValid);

    // Click Login
    const buttonLogin = page.locator(loginPage.buttonLogin);
    await buttonLogin.click();

    // Assert that the Email field is invalid
    await expect(page.getByLabel('Email')).toHaveJSProperty('validity.valid', false);
    // Assert that the Email validation message
    await expect(page.getByText('Double check your email and try again.')).toBeVisible();
});


// 5. Login with an incorrect password
test('Login with an incorrect password', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new pageLogin(page);

    // Enter valid email
    const fieldEmail = page.locator(loginPage.fieldEmail);
    await fieldEmail.waitFor();
    await fieldEmail.fill(testData.userLogin.emailValid);

    // Enter incorrect password
    const fieldPassword = page.locator(loginPage.fieldPassword);
    await fieldPassword.fill(testData.userLogin.passwordInvalid);

    // Click Login
    const buttonLogin = page.locator(loginPage.buttonLogin);
    await buttonLogin.click();

    // Assert that the Password validation message
    await expect(page.getByText('Wrong email or password')).toBeVisible();
});


// 6. Login with a non-existent user email
test('Login with a non-existent user email', async ({ page }) => {

    await openLoginForm(page);

    const loginPage = new pageLogin(page);

    // Enter non-existent email
    const fieldEmail = page.locator(loginPage.fieldEmail);
    await fieldEmail.waitFor();
    await fieldEmail.fill(testData.userLogin.emailNonExistent);

    // Enter valid password
    const fieldPassword = page.locator(loginPage.fieldPassword);
    await fieldPassword.fill(testData.userLogin.passwordValid);

    // Click Login
    const buttonLogin = page.locator(loginPage.buttonLogin);
    await buttonLogin.click();

    // Assert that the Password validation message
    await expect(page.getByText("This email doesn't match any account. Try again.")).toBeVisible();
});