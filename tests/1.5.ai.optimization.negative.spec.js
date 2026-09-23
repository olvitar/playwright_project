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

    const consentPopupWindow = new consentPopup(page);
    await consentPopupWindow.clickButtonConsent();

    const homePage = new pageHome(page);
    await expect(homePage.buttonLanguageEn).toBeVisible();

    const loginPage = new pageLogin(page);
    await loginPage.clickHeaderLogin();

    const signUpPage = new pageSignUp(page);
    await expect(signUpPage.buttonLoginSignUp).toBeVisible();
    await signUpPage.clickLogin();

    await expect(loginPage.fieldEmail).toBeVisible();

    return loginPage;
}



test('Login with empty fields', async ({ page }) => {
    const loginPage = await openLoginForm(page);

    await loginPage.clickLogin();

    await loginPage.expectEmptyEmailError();
    await loginPage.expectEmptyPasswordError();
});


test('Login with empty email', async ({ page }) => {
    const loginPage = await openLoginForm(page);

    await loginPage.enterPassword(testData.userLogin.passwordValid);
    await loginPage.clickLogin();

    await loginPage.expectEmptyEmailError();
    await expect(page.getByLabel('Email')).toHaveJSProperty('validity.valid', false);
});


test('Login with empty password', async ({ page }) => {
    const loginPage = await openLoginForm(page);

    await loginPage.enterEmail(testData.userLogin.emailValid);
    await loginPage.clickLogin();

    await loginPage.expectEmptyPasswordError();

    await expect(page.getByLabel('Password'))
        .toHaveJSProperty('validity.valid', false);
});

test('Login with invalid email format', async ({ page }) => {
    const loginPage = await openLoginForm(page);

    await loginPage.enterEmail(testData.userLogin.emailInvalidFormat);
    await loginPage.enterPassword(testData.userLogin.passwordValid);
    await loginPage.clickLogin();

    await loginPage.expectInvalidEmailError();
});

test('Login with incorrect password', async ({ page }) => {
    const loginPage = await openLoginForm(page);

    await loginPage.enterEmail(testData.userLogin.emailValid);
    await loginPage.enterPassword(testData.userLogin.passwordInvalid);
    await loginPage.clickLogin();

    await loginPage.expectIncorrectCredentialsError();
});


test('Login with non-existent email', async ({ page }) => {
    const loginPage = await openLoginForm(page);

    await loginPage.enterEmail(testData.userLogin.emailNonExistent);
    await loginPage.enterPassword(testData.userLogin.passwordValid);
    await loginPage.clickLogin();

    await loginPage.expectNonExistentEmailError();
});

