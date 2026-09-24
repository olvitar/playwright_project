export class testData {
    //Class body goes here
    static checkoutCustomerDetails = 
    {
        email : "test@example.com",
        firstName : 'Testing',
        lastName : '101',
        phone : '971234578'

    }

    static checkoutDeliveryDetails = 
    {
        address : '1234 Example Street',
        city : 'Lviv',
        zipCode : '10200'
    }

    static userLogin = {
        emailValid: process.env.TEST_USER_EMAIL,
        passwordValid: process.env.TEST_USER_PASSWORD,
        emailInvalidFormat: 'axel.qa',
        passwordInvalid: 'qweASD987',
        emailNonExistent: 'nonexistent.user@example.com'
    }
}