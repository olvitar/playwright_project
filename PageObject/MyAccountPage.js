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
}