import { test, expect } from '@playwright/test';
import { URLs } from '../Common/URLs';
import { consentPopup } from '../Common/ConsentPopup';

test('End to End Purchase flow with the XPath locators', async ({ page }) => {
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
  await page.waitForResponse(response => response.url().includes('/_api/cart-v2/v2/carts/') && response.url().endsWith('/place-order'));

  await expect(
    page.getByText("You'll receive a confirmation email soon.", { exact: true }),
    'Purchase confirmation message is not displayed'
  ).toBeVisible({ timeout: 30000 });
});


