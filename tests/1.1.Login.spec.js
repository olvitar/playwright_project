const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/URLs');

// Please note that the locator for the account button in the video differs from the current one,
// as Wix has since updated it. We have made the necessary changes in the file accordingly.

test('Login with valid credentials', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto(URLs.pageLinkHomePage);
//await page.goto('https://www.testing101.net/', {waitUntil: 'domcontentloaded'});

    //wait till the element is displayed
await page.getByTestId('languages-container').getByLabel('English').waitFor()
//Click on the Consent button on Cookie pop-up if pop-up is displayed
//await page.getByLabel('Consent', { exact: true }).click();
    const consentButton = page.getByLabel('Consent', { exact: true }); 
    if (await consentButton.isVisible()) 
        { await consentButton.click(); }

//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Input valid data into the Email field
await page.getByLabel('Email').fill('axel.qa9@gmail.com');
//Input valid data into the Password field
await page.getByLabel('Password').fill('123qweASD');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

// Assertion: Check if 'andriitest7799 account menu' is visible after login
await expect(page.getByTestId('handle-button')).toBeVisible();
});