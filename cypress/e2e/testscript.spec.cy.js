import BillingPage from "../pages/BillingPage";
import ProductBrowserAndSearching from "../pages/productBrowserAndSearching"

describe('Demo Web Shop', () =>{

    const productBrowserAndSearching = new ProductBrowserAndSearching();
    const billingPage = new BillingPage();
    beforeEach(() => {
        productBrowserAndSearching.visit();
    })

    it('Happy flow',() => {
        productBrowserAndSearching.searchItemAddTOCart()
        billingPage.enterBillingDetails()
    })

    it('Non-happy flow', () => {
        productBrowserAndSearching.searchNonExistProduct()
    })
})