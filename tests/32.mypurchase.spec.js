const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/URLs');
const { consentPopup } = require('../Common/ConsentPopup');

test('E2E Purchase Flow for a Single Product', async ({ page }) => {
    await page.goto(URLs.pageLinkCategoryAllProducts);
    await page.waitForTimeout(5000);

    const consentPopupWindow = new consentPopup(page);
    await consentPopupWindow.clickButtonConsent();

    await page.getByLabel('Americano gallery').getByLabel('Add to Cart').click();
    await page.getByRole('button', { name: 'View Cart' }).click();
    await expect(page.locator('h3[data-hook="EmptyState.title"]')).not.toBeVisible();
    await page.getByLabel('Checkout').click();

    await page.getByLabel('Email').fill('axel.qa@gmail.com');
    await page.getByLabel('First name').fill('Axel');
    await page.getByLabel('Last name').fill('Foley');
    await page.getByLabel('Phone. Phone', { exact: true }).fill('971234578');
    await page.getByLabel('Country/Region*').click();
    await page.getByText('Ukraine', { exact: true }).click();
    await page.getByLabel('Address').fill('Tulips ave 11');
    await page.getByLabel('City').fill('Kyiv');
    await page.getByLabel('Zip / Postal code').fill('01001');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Place Order & Pay' }).click();

    await expect(
        page.getByText("You'll receive a confirmation email soon.", { exact: true }),
        'Purchase confirmation message is not displayed'
    ).toBeVisible({ timeout: 30000 });
});