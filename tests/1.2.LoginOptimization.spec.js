import {test, expect} from '@playwright/test';
import { URLs } from '../Common/URLs';
import { consentPopup } from '../Common/ConsentPopup';
import { pageHome } from '../PageObject/PageHomePage';
import { pageLogin } from '../PageObject/PageLogin';
import { pageSignUp } from '../PageObject/PageSignUp';
import { testData } from '../Common/TestData';

    // Helper: navigate to the Login form
async function openLoginForm(page) {
    await page.goto(URLs.pageLinkHomePage);
    //Click on the Consent button on Cookie pop-up
    const consentPopupWindow = new consentPopup(page);
    await consentPopupWindow.clickButtonConsent();
        // Wait until the languages-container is displayed
    const homePage = new pageHome(page);
    const buttonLanguage = page.locator(homePage.buttonLanguageEn);
    await buttonLanguage.waitFor();

    const loginPage = new pageLogin(page);
    const buttonLoginHeader = page.locator(loginPage.buttonLoginHeader);
    await buttonLoginHeader.click();

    const signUpPage = new pageSignUp(page);
    const buttonLoginSignUp = page.locator(signUpPage.buttonLoginSignUp);
    await buttonLoginSignUp.click();
}

test('Login with valid credentials', async ({ page }) => {
    await openLoginForm(page);
    const loginPage = new pageLogin(page);
    const fieldEmail = page.locator(loginPage.fieldEmail);
    await fieldEmail.fill(testData.userLogin.emailValid);

    const fieldPassword = page.locator(loginPage.fieldPassword);
    await fieldPassword.fill(testData.userLogin.passwordValid);

    const buttonLogin = page.locator(loginPage.buttonLogin);
    await buttonLogin.click();

    // Assertion: Check if 'axel.qa account menu' is visible after login
    await expect(page.getByTestId('handle-button')).toBeVisible();

});