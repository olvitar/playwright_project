const { test, expect } = require('@playwright/test');

const validEmail = 'axel.qa@gmail.com';
const validPassword = '123qweASD';

// Helper: navigate to the Login form
async function openLoginForm(page) {
    await page.goto('https://www.testing101.net/');
    // Click Consent if the cookie pop-up is displayed
    const consentButton = page.getByLabel('Consent', { exact: true });
    if (await consentButton.isVisible()) {
        await consentButton.click();
    }
    // Wait until the language selector is displayed
    await page.getByTestId('languages-container').getByLabel('English').waitFor();
    // Open Login
    await page.getByRole('button', { name: 'Log In' }).click();
    // Switch from Signup to Login
    await page.getByTestId('signUp.switchToSignUp').click();
}

// 1. Login with an empty login form
test('Login with an empty login form', async ({ page }) => {
    await openLoginForm(page);
    // Click Login without entering any data
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();
 
    // Assert that the Email validation message
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
    // Assert that the Password validation message
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});

// 2. Login with an empty email
test('Login with an empty email', async ({ page }) => {
    await openLoginForm(page);
    // Enter only the password
    await page.getByLabel('Password').fill(validPassword);
    // Click Login
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();

    // Assert that the Email field is invalid
    await expect(page.getByLabel('Email')).toHaveJSProperty('validity.valid', false);
    // Assert that the Email validation message
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
});

// 3. Login with an empty password
test('Login with an empty password', async ({ page }) => {
    await openLoginForm(page);
    // Enter only the email
    await page.getByLabel('Email').fill(validEmail);
    // Click Login
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();

    // Assert that the Password field is invalid
    await expect(page.getByLabel('Password')).toHaveJSProperty('validity.valid', false);
    // Assert that the Password validation message
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});

// 4. Login with an invalid email format
test('Login with an invalid email format', async ({ page }) => {
    await openLoginForm(page);
    // Enter an invalid email
    await page.getByLabel('Email').fill('axel.qa');
    // Enter a valid password
    await page.getByLabel('Password').fill(validPassword);
    // Click Login
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();

    // Assert that the Email field is invalid
    await expect(page.getByLabel('Email')).toHaveJSProperty('validity.valid', false);
    // Assert that the Email validation message
    await expect(page.getByText('Double check your email and try again.')).toBeVisible();
});


// 5. Login with an incorrect password
test('Login with an incorrect password', async ({ page }) => {
    await openLoginForm(page);
    // Enter valid email
    await page.getByLabel('Email').fill(validEmail);
    // Enter incorrect password
    await page.getByLabel('Password').fill('WrongPassword123');
    // Click Login
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();

    // Assert that the Password validation message
    await expect(page.getByText('Wrong email or password')).toBeVisible();
});

// 6. Login with a non-existent user email
test('Login with a non-existent user email', async ({ page }) => {
    await openLoginForm(page);
    // Enter a non-existent email
    await page.getByLabel('Email').fill('nonexistent.user@example.com');
    // Enter a valid password
    await page.getByLabel('Password').fill(validPassword);
    // Click Login
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();

    // Assert that the Password validation message
    await expect(page.getByText("This email doesn't match any account. Try again.")).toBeVisible();
});