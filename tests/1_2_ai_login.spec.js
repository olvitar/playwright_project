const { test, expect } = require('@playwright/test');

test('Test Case 1 - Login with valid credentials', async ({ page }) => {

    // 1. Navigate to the Testing101 website
    await page.goto('https://www.testing101.net/');

    // 2. Wait until the languages-container is displayed
    await page.getByTestId('languages-container').getByLabel('English').waitFor();

    // 3. Click on the Login button in the header
    await page.getByRole('button', { name: 'Log In' }).click();

    // 4. Click on the Login button on the Signup page
    await page.getByTestId('signUp.switchToSignUp').click();

    // 5. Input valid data into the Email field
    await page.getByLabel('Email', { exact: true }).fill('axel.qa@gmail.com');

    // 6. Input valid data into the Password field
    await page.getByLabel('Password', { exact: true }).fill('123qweASD');

    // 7. Click on the Login button of the Login form
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();

    //await page.pause()
    // 8. Assert that the username is displayed in the handle-button
    await expect(
        page.getByTestId('handle-button')
    ).toBeVisible();
});