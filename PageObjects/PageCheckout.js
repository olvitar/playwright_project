export class pageCheckout {

    constructor(page) {
        this.page = page;
        // Define the XPath as properties here
        this.fieldEmail = "xpath=//input[@aria-label='Email']";
        this.fieldFirstName = "xpath=//input[@aria-label='First name']";
        this.fiedlLastName = "xpath=//input[@aria-label='Last name']";
        this.fieldPhone = "xpath=//input[@type='phone']";
        this.dropdownCountry = "xpath=//div[@data-hook='form-field-country']"; 
        this.dropdownOption = "xpath=//div[text()='Ukraine']";
        this.fieldAddress = "xpath=//div[@data-hook='form-field-addressLine']//input[@role='combobox']";
        this.fieldCity = "xpath=//input[@aria-label='City']";
        this.fieldZipCode = "xpath=//input[@aria-label='Zip / Postal code']";
        this.buttonContinueChekout1 = "xpath=//span[text()='Continue']";
        this.buttonContinueChekout2 = "xpath=//span[text()='Continue']";
        this.buttonPlaceOrder = "xpath=//span[text()='Place Order & Pay']";
        this.messageConfirmation = 'xpath=//span[text()="You\'ll receive a confirmation email soon."]';
    }
}