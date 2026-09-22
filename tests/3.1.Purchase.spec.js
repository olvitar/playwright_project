const { test, expect } = require('@playwright/test');

test('End-to-End Purchase Flow for a Single Product', async ({ page }) => {
  test.setTimeout(50000);
// Navigate to the Testing101 website
await page.goto('https://www.testing101.net/category/all-products');
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
//await page.getByLabel('Consent', { exact: true }).click();

//Click on the Sorting option of the Filter tab
await page.getByRole('link', { name: 'Sorting' }).click();
await page.waitForTimeout(5000);
//Click on the Add To Cart button on the Americano product
await page.getByLabel('Americano gallery').getByLabel('Add to Cart').click();

//Be aware that we have changed this step to exclude iframe interaction, as shown in the initial video, since the Minicart is no longer part of an iframe.
//Click on the View Cart button on the Cart sidebar
await page.getByRole('button', { name: 'View Cart' }).click();

//Cart Assertion
await expect(page.locator('h3[data-hook="EmptyState.title"]')).not.toBeVisible();
//Click on the Checkout button on the My Cart page
await page.getByLabel('Checkout').click();
await page.waitForTimeout(5000);

//Checkout step 1
await page.getByLabel('Email').fill('your-email@example.com');
await page.getByLabel('First name').fill('John');
await page.getByLabel('Last Name').fill('Doe');
await page.getByLabel('Phone. Phone', { exact: true }).fill('971234578');
await page.getByLabel('Country/Region*').click();
await page.getByText('Ukraine').click();
await page.getByLabel('Address*').fill('123 Main Street');
await page.getByLabel('City').fill('Kyiv');
await page.getByLabel('Zip / Postal code').fill('01001');
await page.getByRole('button', { name: 'Continue' }).click();
//Checkout step 2
await page.getByRole('button', { name: 'Continue' }).click();
//Checkout step 3
await page.getByRole('button', { name: 'Place Order & Pay' }).click();
await page.waitForTimeout(5000);
//Assertion
await expect(
  page.locator('div').filter({ hasText: /^You\'ll receive a confirmation email soon\.$/ })
).toBeVisible({
  message: 'Error: Purchase confirmation message was not displayed.'
});
});
