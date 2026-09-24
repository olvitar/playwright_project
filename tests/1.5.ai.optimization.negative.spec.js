import { test, expect } from '@playwright/test';
import { URLs } from '../Common/URLs';
import { consentPopup } from '../Common/ConsentPopup';
import { HomePage } from '../PageObject/PageHomePage';
import { LoginPage } from '../PageObject/PageLogin';
import { SignUpPage } from '../PageObject/PageSignUp';
import { testData } from '../Common/TestData';

async function openLoginForm(page) {
    await page.goto(URLs.pageLinkHomePage);

    const consentPopupWindow = new ConsentPopup(page);
    await consentPopupWindow.clickButtonConsent();

    const homePage = new HomePage(page);
    await expect(homePage.buttonLanguageEn).toBeVisible();
    await homePage.clickLogin();

    const loginPage = new LoginPage(page);
    const signUpPage = new SignUpPage(page);

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
    await expect(loginPage.fieldEmail)
        .toHaveJSProperty('validity.valid', false);
});

test('Login with empty password', async ({ page }) => {
    const loginPage = await openLoginForm(page);

    await loginPage.enterEmail(testData.userLogin.emailValid);
    await loginPage.clickLogin();

    await loginPage.expectEmptyPasswordError();
    await expect(loginPage.fieldPassword)
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
