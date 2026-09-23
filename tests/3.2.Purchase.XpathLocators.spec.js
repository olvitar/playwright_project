import {test,expect} from '@playwright/test';
import { URLs } from '../Common/URLs';
import { consentPopup } from '../Common/ConsentPopup';
import { pagePLP } from '../PageObject/PagePLP';
import { pageCartPage } from '../PageObject/PageCartPage';
import { pageCheckout } from '../PageObject/PageCheckout';
import { testData } from '../Common/TestData';

// Pay attention that we have updated the step to directly interact with the "View Cart" button
// without switching to an iframe, as the Minicart is no longer embedded in one.

test('End to End Purchase flow with the XPath locators', async ({ page }) => {
  //test.setTimeout(50000);
// Navigate to the Testing101 website
await page.goto(URLs.pageLinkCategoryAllProducts);
await page.waitForTimeout(5000);

//Click on the Consent button on Cookie pop-up
const consentPopupWindow = new consentPopup(page);
await consentPopupWindow.clickButtonConsent();

const plpPage = new pagePLP(page);
//Click on the Sorting option of the Filter tab
const buttonSorting = page.locator(plpPage.buttonSorting);
await buttonSorting.click();
await page.waitForTimeout(5000);
//Click on the Add To Cart button on the Americano product
const buttonAddToCartPLP = page.locator(plpPage.buttonAddToCartPLP);
await buttonAddToCartPLP.waitFor();
await buttonAddToCartPLP.click();

//we have updated the step to directly interact with the "View Cart" button
// without switching to an iframe, as the Minicart is no longer embedded in one.
// // Click on the View Cart button on the Minicart sidebar
const cartPage = new pageCartPage(page); 
const buttonViewCart = page.locator(cartPage.buttonViewCart); 
await buttonViewCart.waitFor();
await buttonViewCart.click(); 
//Cart Assertion
const assertionEmptyCart = page.locator(cartPage.assertionEmptyCart);
await expect(assertionEmptyCart).not.toBeVisible();
//Click on the Checkout button on the My Cart page
const buttonCheckout = page.locator(cartPage.buttonCheckout);
await buttonCheckout.waitFor();
await buttonCheckout.click();

//Checkout step 1
const checkoutPage = new pageCheckout(page);
const fieldEmail = page.locator(checkoutPage.fieldEmail);
await fieldEmail.fill(testData.checkoutCustomerDetails.email);
const fieldFirstName = page.locator(checkoutPage.fieldFirstName);
await fieldFirstName.fill(testData.checkoutCustomerDetails.firstName);
const fieldLastName = page.locator(checkoutPage.fiedlLastName);
await fieldLastName.fill(testData.checkoutCustomerDetails.lastName);
const fieldPhone = page.locator(checkoutPage.fieldPhone);
await fieldPhone.fill(testData.checkoutCustomerDetails.phone);
const dropdownCountryRegion = page.locator(checkoutPage.dropdownCountry);
await dropdownCountryRegion.click();
const dropdownOption = page.locator(checkoutPage.dropdownOption);
await dropdownOption.click();
const fieldAddress = page.locator(checkoutPage.fieldAddress);
await fieldAddress.fill(testData.checkoutCustomerDetails.address);
const fieldCity = page.locator(checkoutPage.fieldCity);
await fieldCity.fill(testData.checkoutCustomerDetails.city);
const fieldZipCode = page.locator(checkoutPage.fieldZipCode);
await fieldZipCode.fill(testData.checkoutCustomerDetails.zipCode);
const buttonContinueCheckout1 = page.locator(checkoutPage.buttonContinueChekout1);
await buttonContinueCheckout1.click();
//Checkout step 2
const buttonContinueCheckout2 = page.locator(checkoutPage.buttonContinueChekout2);
await buttonContinueCheckout2.click();
//Checkout step 3
const buttonPlaceOrder = page.locator(checkoutPage.buttonPlaceOrder);
await buttonPlaceOrder.waitFor();
await buttonPlaceOrder.click();
await page.waitForTimeout(5000);

//Assertion
await expect(
page.locator(checkoutPage.messageConfirmation)
).toBeVisible({
  message: 'Error: Purchase confirmation message was not displayed.'
});
});



