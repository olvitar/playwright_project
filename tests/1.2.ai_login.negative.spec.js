const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/URLs');

const validEmail = 'axel.qa@gmail.com';
const validPassword = '123qweASD';

async function acceptConsentIfVisible(page) {
    const consentButton = page.getByRole('button', { name: /^Consent$/i });
    if (await consentButton.isVisible().catch(() => false)) {
        await consentButton.click();
    }
}

async function switchToLogin(page) {
    const emailField = page.getByLabel('Email');
    const passwordField = page.getByLabel('Password');
    if (await emailField.isVisible().catch(() => false) && await passwordField.isVisible().catch(() => false)) {
        return;
    }

    const signupSwitch = page.getByTestId('signUp.switchToSignUp');
    const memberSwitch = page.getByRole('button', { name: /Already a member\? Log In/i });

    if (await signupSwitch.isVisible().catch(() => false)) {
        await signupSwitch.click();
        return;
    }

    if (await memberSwitch.isVisible().catch(() => false)) {
        await memberSwitch.click();
        return;
    }
}

async function openLoginForm(page) {
    await page.goto(URLs.pageLinkHomePage);
    await acceptConsentIfVisible(page);
    await page.getByRole('button', { name: 'Log In' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Log In' }).click();
    await switchToLogin(page);
}

test('Login with an empty login form', async ({ page }) => {
    await openLoginForm(page);
    await page.getByTestId('buttonElement').click();
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});

test('Login with an empty email', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Password').fill(validPassword);
    await page.getByTestId('buttonElement').click();

    await expect(page.getByLabel('Email')).toHaveJSProperty('validity.valid', false);
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
});

test('Login with an empty password', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Email').fill(validEmail);
    await page.getByTestId('buttonElement').click();

    await expect(page.getByLabel('Password')).toHaveJSProperty('validity.valid', false);
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});

test('Login with an invalid email format', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Email').fill('axel.qa');
    await page.getByLabel('Password').fill(validPassword);
    await page.getByTestId('buttonElement').click();

    await expect(page.getByLabel('Email')).toHaveJSProperty('validity.valid', false);
    await expect(page.getByText('Double check your email and try again.')).toBeVisible();
});

test('Login with an incorrect password', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Email').fill(validEmail);
    await page.getByLabel('Password').fill('WrongPassword123');
    await page.getByTestId('buttonElement').click();

    await expect(page.getByText('Wrong email or password')).toBeVisible();
});

test('Login with a non-existent user email', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Email').fill('nonexistent.user@example.com');
    await page.getByLabel('Password').fill(validPassword);
    await page.getByTestId('buttonElement').click();

    await expect(page.getByText(/This email .*match any account|This email doesn't match any account\. Try again\./i)).toBeVisible();
});