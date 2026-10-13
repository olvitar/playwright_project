const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/URLs');
const { consentPopup } = require('../Common/ConsentPopup');

async function login(page) {
    await page.goto(URLs.pageLinkHomePage);

    const consentPopupWindow = new consentPopup(page);
    await consentPopupWindow.clickButtonConsent();

    await page.getByTestId('languages-container').getByLabel('English').waitFor();
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('button', { name: /Already a member\? Log In/i }).click();

    await page.getByLabel('Email').fill('andriitest7799@gmail.com');
    await page.getByLabel('Password').fill('Aa123_123');
    await page.locator('form').getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByTestId('handle-button')).toBeVisible();
}

test('Add a new Address in My Account', async ({ page }) => {
    await login(page);

    await page.getByTestId('handle-button').click();
    await page.getByRole('menuitem', { name: 'My Addresses' }).click();
    await page.frameLocator('iframe[title="My Addresses"]').getByRole('button', { name: 'Add New Address' }).click();

    const frame = page.frameLocator('iframe[name^="tpapopup-"]');
    await frame.getByLabel('First name').fill('Testing');
    await frame.getByLabel('Last name').fill('101');
    await frame.getByLabel('Company name').fill('Testing101');
    await frame.getByLabel('Address', { exact: true }).fill('Ukraine, Lviv');
    await frame.getByPlaceholder('Apartment, suite, floor').fill('101');
    await frame.getByLabel('City').fill('Lviv');
    await frame.getByRole('img').nth(1).click();
    await frame.getByText('Ukraine', { exact: true }).click();
    await frame.getByLabel('Zip / Postal code').fill('10001');
    await frame.getByLabel('Phone').fill('+1234567890');
    await frame.getByLabel('Add Address and close dialog').click();

    const addressLocator = page.frameLocator('iframe[title="My Addresses"]').locator('address[data-hook="formatted-address"]').first();
    await expect(addressLocator).toContainText('Test 101');
    await expect(addressLocator).toContainText('Testing101');
    await expect(addressLocator).toContainText('Ukraine');
    await expect(addressLocator).toContainText('+1234567890');
});
