const { test, expect } = require('@playwright/test');

test('E2E Purchase Flow for a Single Product'', async ({ page }) => {

    await page.goto('https://www.testing101.net/category/all-products');
        // Wait until the language selector is displayed
    await page.getByTestId('languages-container').getByLabel('English').waitFor();
        // Click Consent if the cookie pop-up is displayed
    const consentButton = page.getByLabel('Consent', { exact: true });
    if (await consentButton.isVisible()) {
        await consentButton.click();
    };

    await page.getByRole('link', { name: 'Sorting' }).click();
    //console.log(await page.locator('body').innerText());
    //await expect(page.getByLabel('Americano gallery').getByLabel('Add to Cart')).toBeVisible();
    await page.waitForTimeout(3000);
    await page.getByLabel('Americano gallery').getByLabel('Add to Cart').click();
    
    await page.getByRole('heading', { name: 'Cart' }).waitFor();
    //Click on the View Cart button on the Cart sidebar
    await page.getByRole('button', { name: 'View Cart' }).click();
    //Cart Assertion
    await page.getByRole('heading', { name: 'Order summary' }).waitFor()
    await expect(page.getByText('Cart is empty', { exact: true })).not.toBeVisible(); //verify that at least one item is added to the cart (error message is not visible at the page)
    await page.getByLabel('Checkout').click();
    //Checkout step 1
    await page.getByRole('heading', { name: 'Customer details' }).waitFor()
    await page.getByLabel('Email').fill('axel.qa@gmail.com');
    await page.getByLabel('First name').fill('Axel');
    await page.getByLabel('Last name').fill('Foley');
    await page.getByLabel('Phone. Phone', { exact: true }).fill('971234578');
    await page.getByLabel('Country/Region*').click();
    await page.getByText('Ukraine').click();
    await page.getByLabel('Address').fill('Tulips ave 11');
    await page.getByLabel('City').fill('Kyiv');
    await page.getByLabel('Zip / Postal code').fill('01001');
    await page.getByRole('button', { name: 'Continue' }).click();
    //Checkout step 2
    await page.getByText('Free shipping').waitFor();
    await page.getByRole('button', { name: 'Continue' }).click();
    //Checkout step 3
    await page.getByText('Manual Payment').waitFor();
    await page.getByRole('button', { name: 'Place Order & Pay' }).click();
        //--wait for the API Responce
    await page.waitForResponse(response => response.url().includes('/_api/cart-v2/v2/carts/') && response.url().endsWith('/place-order')); //https://www.testing101.net/_api/cart-v2/v2/carts/ca727402-fb0e-42ee-a7d8-91e839d4cc48/place-order
    //Assertion

    await expect(
        page.getByText("You'll receive a confirmation email soon.", { exact: true }),
        'Purchase confirmation message is not displayed'
    ).toBeVisible();


});