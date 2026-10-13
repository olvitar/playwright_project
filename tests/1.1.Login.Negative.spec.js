const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/URLs');

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

    const accountButton = page.getByTestId('handle-button');
    if (await accountButton.isVisible().catch(() => false)) {
        await accountButton.click();
        const logoutButton = page.getByRole('menuitem', { name: /Log Out|Sign Out/i });
        if (await logoutButton.isVisible().catch(() => false)) {
            await logoutButton.click();
        } else {
            await page.goto(URLs.pageLinkHomePage);
        }
    }

    await page.getByRole('button', { name: 'Log In' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Log In' }).click();
    await switchToLogin(page);
}

test('Login with valid credentials', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Email').fill('andriitest7799@gmail.com');
    await page.getByLabel('Password').fill('Aa123_123');
    await page.getByTestId('buttonElement').click();
    await expect(page.getByTestId('handle-button')).toBeVisible();
});

test('Login with empty fields of the Login form', async ({ page }) => {
    await openLoginForm(page);
    await page.getByTestId('buttonElement').click();
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});

test('Login with an empty Email field of the Login form', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Password').fill('Aa123_123');
    await page.getByTestId('buttonElement').click();
    await expect(page.getByText('Email cannot be blank')).toBeVisible();
});

test('Login with an empty Password field of the Login form', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Email').fill('andriitest7799@gmail.com');
    await page.getByTestId('buttonElement').click();
    await expect(page.getByText('Make sure you enter a password.')).toBeVisible();
});

test('Login with the invalid format of the Email', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Email').fill('andriitest7799%gmail.com');
    await page.getByLabel('Password').fill('Aa123_123');
    await page.getByTestId('buttonElement').click();
    await expect(page.getByText('Double check your email and try again.')).toBeVisible();
});

test('Login with the invalid Password', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Email').fill('andriitest7799@gmail.com');
    await page.getByLabel('Password').fill('Aa123_1');
    await page.getByTestId('buttonElement').click();
    await expect(page.getByText('Wrong email or password')).toBeVisible();
});

test('Login with non-existent user email', async ({ page }) => {
    await openLoginForm(page);
    await page.getByLabel('Email').fill('andriitest12345@gmail.com');
    await page.getByLabel('Password').fill('Aa123_123');
    await page.getByTestId('buttonElement').click();
    await expect(page.getByText(/This email .*match any account|This email doesn't match any account\. Try again\./i)).toBeVisible();
});



