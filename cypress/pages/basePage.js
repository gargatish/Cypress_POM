class BasePage {

    // Method to enter value
    enterValue(locators, value){
        cy.get(locators).clear().type(value)
    }

    // click on button
    clickonButton(locators){
        cy.get(locators).click()
    }
}

export default BasePage;