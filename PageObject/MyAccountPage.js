export class MyAccountPage {

    constructor(page) {
        this.page = page;
        // Define the XPath as properties here
        this.buttonMyAccount = page.getByTestId('handle-button');
        this.buttonMyAddresses = page.getByRole('menuitem', { name: 'My Addresses' });
        this.iframeMyAddresses = page.frameLocator('iframe[title="My Addresses"]').getByRole('button', { name: 'Add New Address' });
        const iframe = page.frameLocator('iframe[name^="tpapopup-"]');  //^= means "starts with"
        this.FirstName =  iframe.getByLabel('First name');
        this.LastName =  iframe.getByLabel('Last name');
        this.CompanyName =  iframe.getByRole('textbox', { name: 'Company name' });
        this.Address =  iframe.getByLabel('Address', { exact: true });
        this.AddressLine2 =  iframe.getByPlaceholder('Apartment, suite, floor');
        this.City =  iframe.getByLabel('City');
        this.CountryDropdown =  iframe.getByRole('img').nth(1);
        this.CountryOption =  iframe.getByText('Ukraine');
        this.ZipCode =  iframe.getByLabel('Zip / Postal code');
        this.Phone =  iframe.getByLabel('Phone');
        this.AddAddressButton =  iframe.getByLabel('Add Address and close dialog');
        
    }

    async clickMyAccount() {
        await this.buttonMyAccount.click();
    }

    async clickMyAddresses() {
        await this.buttonMyAddresses.click();
    }

    async clickIframeMyAddresses() {
        await this.iframeMyAddresses.click();
    }

    async enterFIrstName(firstName) {
        await this.FirstName.fill(firstName);
    }

    async enterLastName(lastName) {
        await this.LastName.fill(lastName);
    }

    async enterCompanyName(companyName) {
        await this.CompanyName.fill(companyName);
    }

    async enterAddress(address) {
        await this.Address.fill(address);
    }

    async enterAddressLine2(addressLine2) {
        await this.AddressLine2.fill(addressLine2);
    }

    async enterCity(city) {
        await this.City.fill(city);
    }

    async selectCountry() {
        await this.CountryDropdown.click();
        await this.CountryOption.click();
    }   

    async enterZipCode(zipCode) {
        await this.ZipCode.fill(zipCode);
    }   

    async enterPhone(phone) {
        await this.Phone.fill(phone);
    }   

    async clickAddAddressButton() {
        await this.AddAddressButton.click();
    }   


}