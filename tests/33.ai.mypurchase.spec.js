// @ts-check
const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/URLs');
import { ConsentPopup } from '../Common/ConsentPopup';

test('E2E Purchase Flow for a Single Product', async ({ page }) => {

    await page.goto(URLs.pageLinkCategoryAllProducts);
        // Wait until the language selector is displayed
    await page.getByTestId('languages-container').getByLabel('English').waitFor();
        //Click on the Consent button on Cookie pop-up
    const consentPopupWindow = new ConsentPopup(page);
    await consentPopupWindow.clickButtonConsent();

    const productList = page.getByRole('region', { name: 'Product Gallery' }).getByRole('list');
    await expect(productList).toBeVisible();

    const productTiles = productList.getByRole('listitem');
    await expect(productTiles).not.toHaveCount(0);
    await productTiles.first().getByRole('link').first().click();

});