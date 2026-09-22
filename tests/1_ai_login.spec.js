const { test, expect } = require('@playwright/test');

test('Login to the Testing101 website', async ({ page }) => {
    // Open the website
    await page.goto('https://www.testing101.net/');

//Click on the Consent button on Cookie pop-up if pop-up is displayed   
    const consentButton = page.getByLabel('Consent', { exact: true }); 
    if (await consentButton.isVisible()) 
        { await consentButton.click(); }

    //wait till the element is displayed
    await page.getByTestId('languages-container').getByLabel('English').waitFor()

    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByTestId('signUp.switchToSignUp').click();
    await page.getByLabel('Email').fill('axel.qa@gmail.com');
    await page.getByLabel('Password').fill('123qweASD');
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();

    //await page.pause()
    // Assertion: Check if 'axel.qa account menu' is visible after login
    await expect(page.getByTestId('handle-button')).toBeVisible();
    await expect(page.getByTestId('handle-button')).toContainText('axel.qa');
  });