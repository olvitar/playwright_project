const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/URLs');

// Please note that the locator for the account button in the video differs from the current one,
// as Wix has since updated it. We have made the necessary changes in the file accordingly.

test('Login with valid credentials', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto(URLs.pageLinkHomePage);
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();
//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Input valid data into the Email field
await page.getByLabel('Email').fill('andriitest7799@gmail.com');
//Input valid data into the Password field
await page.getByLabel('Password').fill('Aa123_123');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

// Assertion: Check if 'andriitest7799 account menu' is visible after login
await expect(page.getByTestId('handle-button')).toBeVisible();
});

test('Login with empty fields of the Login form', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto('https://www.testing101.net/');
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();
//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

//Assertion to check the error message of the Email field
await expect(page.getByText('Email cannot be blank')).toBeVisible();
//Assertion to check the error message of the Password field
await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});

test('Login with an empty Email field of the Login form', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto('https://www.testing101.net/');
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();
//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Input valid data into the Password field
await page.getByLabel('Password').fill('Aa123_123');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

//Assertion to check the error message of the Email field
await expect(page.getByText('Email cannot be blank')).toBeVisible();
});

test('Login with an empty Password field of the Login form', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto('https://www.testing101.net/');
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();
//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Input valid data into the Email field
await page.getByLabel('Email').fill('andriitest7799@gmail.com');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

//Assertion to check the error message of the Password field
await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});

test('Login with the invalid format of the Email', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto('https://www.testing101.net/');
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();
//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Input valid data into the Email field
await page.getByLabel('Email').fill('andriitest7799%gmail.com');
//Input valid data into the Password field
await page.getByLabel('Password').fill('Aa123_123');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

//Assertion to check the error message of the Email field
await expect(page.getByText('Double check your email and try again.')).toBeVisible();
});


test('Login with the invalid Password', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto('https://www.testing101.net/');
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();
//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Input valid data into the Email field
await page.getByLabel('Email').fill('andriitest7799@gmail.com');
//Input valid data into the Password field
await page.getByLabel('Password').fill('Aa123_1');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

//Assertion to check the error message of Password field
await expect(page.getByText('Wrong email or password')).toBeVisible();
});

test('Login with non-existent user email', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto('https://www.testing101.net/');
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();
//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Input valid data into the Email field
await page.getByLabel('Email').fill('andriitest12345@gmail.com');
//Input valid data into the Password field
await page.getByLabel('Password').fill('Aa123_123');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

//Assertion to check a non-existent user Email error message
await expect(page.getByText("This email doesn't match any account. Try again.")).toBeVisible();
});



