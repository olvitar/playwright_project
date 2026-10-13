const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/URLs');

async function acceptConsentIfVisible(page) {
    const consentButton = page.getByRole('button', { name: /^Consent$/i });
    if (await consentButton.isVisible().catch(() => false)) {
        await consentButton.click();
    }
}

async function switchToLogin(page) {
    const switchButton = page.getByRole('button', { name: /Already a member\? Log In/i });
    await switchButton.waitFor({ state: 'visible' });
    await switchButton.click();
}

test('Login with valid credentials', async ({ page }) => {
    await page.goto(URLs.pageLinkHomePage);
    await page.getByTestId('languages-container').getByLabel('English').waitFor();

    await acceptConsentIfVisible(page);
    await page.getByRole('button', { name: 'Log In' }).click();
    await switchToLogin(page);

    await page.getByLabel('Email').fill('axel.qa9@gmail.com');
    await page.getByLabel('Password').fill('123qweASD');
    await page.getByTestId('buttonElement').click();

    await expect(page.getByTestId('handle-button')).toBeVisible();
});