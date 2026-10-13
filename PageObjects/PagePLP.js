export class pagePLP {

    constructor(page) {
        this.page = page;
        // Define the XPath as properties here
        this.buttonSorting = "xpath=//span[text()='Sorting']";
        this.buttonAddToCartPLP = "xpath=//div[@data-slug='americano']//span[text()='Add to Cart']";
    }
}