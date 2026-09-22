const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/URLs');

const validEmail = 'axel.qa@gmail.com';
const validPassword = '123qweASD';

// Helper: log in to the app
async function validLogin(page) {
    await page.goto(URLs.pageLinkHomePage);
        // Wait until the language selector is displayed
    await page.getByTestId('languages-container').getByLabel('English').waitFor();
        // Click Consent if the cookie pop-up is displayed
    const consentButton = page.getByLabel('Consent', { exact: true });
    if (await consentButton.isVisible()) {
        await consentButton.click();
    };
    
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByTestId('signUp.switchToSignUp').click();
    await page.getByLabel('Email').fill(validEmail);
    await page.getByLabel('Password').fill(validPassword);
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByTestId('handle-button')).toContainText('axel.qa');
}

test('Add a new Address in My Account', async ({ page }) => {
    await validLogin(page);

    await page.getByTestId('handle-button').click();
    await page.getByRole('menuitem', { name: 'My Addresses' }).click();
    await page.frameLocator('iframe[title="My Addresses"]').getByRole('button', { name: 'Add New Address' }).click();
    
    //Start interaction with the iframe, which name changes dynamically
    const iframe = page.frameLocator('iframe[name^="tpapopup-"]');  //^= means "starts with"
    await iframe.getByLabel('First name').fill('Axel');
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
