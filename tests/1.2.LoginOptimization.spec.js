import { test, expect } from '@playwright/test';
import { URLs } from '../Common/URLs';
import { ConsentPopup } from '../Common/ConsentPopup';
import { HomePage } from '../PageObject/HomePage';
import { LoginPage } from '../PageObject/LoginPage';
import { SignUpPage } from '../PageObject/SignUpPage';
import { testData } from '../Common/TestData';

    // Helper: navigate to the Login form
async function openLoginForm(page) {
    await page.goto(URLs.pageLinkHomePage);

    //const consentPopup = new ConsentPopup(page);
    //await consentPopup.clickButtonConsent();

    const homePage = new HomePage(page);
    await expect(homePage.buttonLanguageEn).toBeVisible();

    await homePage.clickLogin();

    const signUpPage = new SignUpPage(page);
    await expect(signUpPage.buttonLoginSignUp).toBeVisible();

    await signUpPage.clickLogin();

    const loginPage = new LoginPage(page);
    await expect(loginPage.fieldEmail).toBeVisible();

    return loginPage;
}

test('Login with valid credentials', async ({ page }) => {
    const loginPage = await openLoginForm(page);

    await loginPage.enterEmail(testData.userLogin.emailValid);
    await loginPage.enterPassword(testData.userLogin.passwordValid);
    await loginPage.clickLogin();
        // Assertion: Check if 'axel.qa account menu' is visible after login
    await expect(page.getByTestId('handle-button')).toBeVisible();
});

