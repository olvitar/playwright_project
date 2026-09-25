import { test, expect } from '@playwright/test';
import { URLs } from '../Common/URLs';
import { ConsentPopup } from '../Common/ConsentPopup';
import { HomePage } from '../PageObject/HomePage';
import { LoginPage } from '../PageObject/LoginPage';
import { SignUpPage } from '../PageObject/SignUpPage';
import { testData } from '../Common/TestData';
import { MyAccountPage } from '../PageObject/MyAccountPage';

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

        // Navigate to the "My Addresses" section
    const myAccountPage = new MyAccountPage(page);
    
    await myAccountPage.clickMyAccount();
    await myAccountPage.clickMyAddresses();
    await myAccountPage.clickIframeMyAddresses();
    
    await page.pause(); // Pause for debugging
    //Start interaction with the iframe, which name changes dynamically
    //const iframe = page.frameLocator('iframe[name^="tpapopup-"]');  //^= means "starts with"
    await myAccountPage.enterFIrstName(testData.userAddress.firstName);
    await myAccountPage.enterLastName(testData.userAddress.lastName);

    await iframe.getByLabel('Last name').fill('Foley');
    await iframe.getByLabel('Company name').fill('DataArt');
    await iframe.getByLabel('Address', { exact: true }).fill('Tulips ave ');
    await iframe.getByPlaceholder('Apartment, suite, floor').fill('155 apartment, 7 suite, 16 floor');
    await iframe.getByLabel('City').fill('Lviv');

    //Open the Country Drop-down menu
    await iframe.getByRole('img').nth(1).click();
    //await iframe.getByLabel('Country/Region').fill('ukr');
    await iframe.getByText('Ukraine').click();
    await iframe.getByLabel('Zip / Postal code').fill('01001');
    await iframe.getByLabel('Phone').fill('+3809712345678');
    await iframe.getByLabel('Add Address and close dialog').click()

    //Assertion 
    const addressLocator = page.frameLocator('iframe[title="My Addresses"]')
        .locator('address[data-hook="formatted-address"]');

    await expect(addressLocator).toHaveText(`
        Axel Foley
        DataArt
        Tulips ave, 155 apartment, 7 suite, 16 floor
        Lviv,  01001
        Ukraine
        +3809712345678
    `);
});