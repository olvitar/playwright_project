const { test, expect } = require('@playwright/test');

test('XPath Playwright Locators', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto('https://www.testing101.net/playwrightlocators');
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();

//Xpath Locators
await page.locator('xpath=//select').click();
//await page.locator('xpath=//button[@data-testid="buttonElement"]').click();
//await page.locator('xpath=//*[@data-testid="buttonElement"]').click();
//await page.locator('xpath=//span[text()="Submit"]').click();
//await page.locator('xpath=//*[text()="Submit"]').click();
//await page.locator('xpath=//select').click();
//await page.locator('xpath=//*[text()="Personal" and @class="P6sHUt"]').click();
//await page.locator('xpath=//*[id="input_comp-llcdvbb8" or @name="first-name"]').click();
//await page.locator('xpath=//*[contains(text(), "terms")]').click();
//wait page.locator('xpath=//*[contains(@class, "T6F83Z")]').click();
await page.locator('xpath=//button//span[text() = "Submit"]').click();
await page.pause();
});