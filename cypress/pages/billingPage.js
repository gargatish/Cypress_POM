import { testData } from "../fixtures/testData";
import BasePage from "./basePage";

class BillingPage extends BasePage{
    constructor(){
        super();
        this.locators = {
            firstNameInput:'#BillingNewAddress_FirstName',
            lastNameInput:'#BillingNewAddress_LastName',
            emailInput:'#BillingNewAddress_Email',
            countryDropdown:'#BillingNewAddress_CountryId',
            stateDropdown:'#BillingNewAddress_StateProvinceId',
            cityInput:'#BillingNewAddress_City',
            addressInput:'#BillingNewAddress_Address1',
            zipcodeInput:'#BillingNewAddress_ZipPostalCode',
            phoneInput:'#BillingNewAddress_PhoneNumber',
            continueButton:'#billing-buttons-container > .button-1',
            shippingAddress:'#shipping-address-select',
        }
    }
    // address = testData.firstName + testData.lastName+',' + testData.address1+',' + testData.city + testData.zipCode +',' +testData.country;
    // methot to enter billing deatils
    enterBillingDetails(){
        this.enterValue(this.locators.firstNameInput, testData.firstName);
        this.enterValue(this.locators.lastNameInput, testData.lastName);
        this.enterValue(this.locators.emailInput, testData.email);
        cy.get(this.locators.countryDropdown).select(testData.country);
        this.enterValue(this.locators.cityInput,testData.city);
        this.enterValue(this.locators.addressInput, testData.address1);
        this.enterValue(this.locators.zipcodeInput, testData.zipCode);
        this.enterValue(this.locators.phoneInput, testData.phoneNumber);
        this.clickonButton(this.locators.continueButton);
        this.verifyAddress();
    }

    // verify address on shipping address
    verifyAddress(){
        const address = testData.firstName +' '+ testData.lastName+', ' + testData.address1+', ' + testData.city + ' '+testData.zipCode +', ' +testData.country;
        cy.get(this.locators.shippingAddress).contains(address)
    }
}

export default BillingPage;