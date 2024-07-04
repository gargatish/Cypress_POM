
import { sitedate } from "../fixtures/applicationData"
import { testData } from "../fixtures/testData"
import BasePage from "./basePage"

class ProductBrowserAndSearching extends BasePage{
   
    
    constructor(){
        super()
        this.locators = {
            searchStoreInputbox:'#small-searchterms',
            searchButton:'[class="button-1 search-box-button"]',
            productTitle:'[class="product-title"]',
            addCartButton:'.button-2',
            toastMessage:'[class="content"]',
            shoppingCartButton:'[class="cart-label"]',
            addCartButtonSecond:'[class="button-1 add-to-cart-button"]',
            termsofServiceButton:'[id="termsofservice"]',
            checkOutButton:'[id="checkout"]',
            checkOutAsGuestButton:'[class="button-1 checkout-as-guest-button"]',
            totalOrderPrize:'[class="product-price order-total"]',
            productOnCartPage:'[class="product-name"]',
            nonExistProduct:'[class="result"]'
               }
    }
    // Visit website and verify the titile
    visit(){
        cy.visit(sitedate.url)
        cy.title().should('eq',sitedate.title)
    }

    // Veify search box placeholdervalue and search item
    searchItemAddTOCart(){
        cy.get(this.locators.searchStoreInputbox).invoke('val').should('eq',sitedate.searchBoxPlaceholerValue)
        this.enterValue(this.locators.searchStoreInputbox, testData.searchItem)
        this.clickonButton(this.locators.searchButton)
        this.verifySearchResultAndAddToCartButton()
        this.checkServiceButton()
        this.checkOutFromCart()
    }

    // verify search result and click on add to cart button
    verifySearchResultAndAddToCartButton(){
        cy.get(this.locators.productTitle).contains(testData.searchItem)
        cy.getValueAndStore();
        cy.get('.item-box').then($elements => {
            const count = $elements.length;
           if(count == 1){
            cy.get(this.locators.addCartButton).first().click()
           } else {
            cy.get(this.locators.addCartButton).first().click()
            this.clickonButton(this.locators.addCartButtonSecond)
           }
          });
          this.verifyToastMessage();
          cy.get(this.locators.shoppingCartButton).first().click()
          cy.get('.page-title', { timeout: 10000 }) // Waits for 10 seconds
     .should('be.visible');
     cy.get(this.locators.productOnCartPage).contains(testData.searchItem)
     if(testData.searchItem == 'Computer'){
        cy.getGlobalProductPrice().then((price) => {
            cy.get(this.locators.totalOrderPrize).contains(parseFloat(price)+15);
          });
     } else {
        cy.getGlobalProductPrice().then((price) => {
            cy.get(this.locators.totalOrderPrize).contains(price);
          });
     }
    }
    
    // verifyToastMessg
    verifyToastMessage(){
        cy.get(this.locators.toastMessage).contains(sitedate.toastMessage)
    }
    // Check the term of service button
    checkServiceButton(){
        cy.get(this.locators.termsofServiceButton).check();
    }

    // checkout from cart
    checkOutFromCart(){
        this.clickonButton(this.locators.checkOutButton)
        this.clickonButton(this.locators.checkOutAsGuestButton)
    }
    
    // search product that doesnot exist
    searchNonExistProduct(){
        cy.get(this.locators.searchStoreInputbox).invoke('val').should('eq',sitedate.searchBoxPlaceholerValue)
        this.enterValue(this.locators.searchStoreInputbox, testData.noValidProduct)
        this.clickonButton(this.locators.searchButton)
        cy.get(this.locators.nonExistProduct).contains(sitedate.noExistProductMessage)
    }
}

export default ProductBrowserAndSearching;