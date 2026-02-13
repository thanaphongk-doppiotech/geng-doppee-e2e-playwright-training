import { test } from '../src/fixtures/app.fixtures';
import testData from '../src/data/testdata/assignment_001.json';
import { testAddress } from '../src/data/testdata/assignment_001';

test.describe('assignment_001', () => {

    test.beforeEach(async ({ app }) => {
        await app.page.goto('/')
    })

    test('Verify new register customer can be purchase product successfully', async ({ app, utils, translations }) => {
        // prepare test data
        const { menuBarPage, signUpService, productListPage, productDetailPage, productDetailService, notificationPage, cartPage, checkoutPage, checkoutService, orderConfirmPage } = app;
        const { full_name, password } = testData.user;
        const email = utils.getRandomEmail();
        const mobilePhone = utils.getRandomMobileNumber();
        // start test case
        // 1.	Register a new account.
        await signUpService.registerWithGenerateEmail(full_name, mobilePhone, email, password, password);
        // 2.	Apply the filter Electronics.
        await productListPage.selectCategoryByName(translations.product_list_page.category.electronics);
        await productListPage.clickApplyButton();
        // 3.	Click View Details for a product. Ear bud
        await productListPage.clickViewDetailsByProductName(testData.product.earbud.name);
        // 4.	Retrieve the product name.
        const earbudProductName = await productDetailPage.getProductName();
        // 5.	Retrieve the product price.
        const earbudProductPrice = await productDetailPage.getProductTotalPrice();
        // 6.	Retrieve the product quantity.
        const earbudProductQty = await productDetailPage.getProductQuantity();
        // 7.	Select a color (if required).
        await productDetailPage.selectColorByColorName(translations.product_detail_page.product.attribute.color.black);
        // 8.	Click Add to Cart.
        await productDetailPage.clickAddToCartButton();
        // 9.	Verify that the pop-up “Add to Cart” appears.
        await notificationPage.verifyAddToCartSuccess();
        // 10.	Click the button to go back to the products list.
        await productDetailPage.clickBackToProductButton();
        // 11.	Click View Details for another product. keyboard
        await productListPage.inputSearch(testData.product.keyboard.search_keyword);
        await productListPage.clickApplyButton();
        await productListPage.clickViewDetailsByProductName(testData.product.keyboard.name);
        // 12.	Retrieve the product name.
        const keyboardProductName = await productDetailPage.getProductName();
        // 13.	Retrieve the product price.
        const keyboardProductPrice = await productDetailPage.getProductTotalPrice();
        // 14.	Retrieve the product quantity.
        const keyboardProductQty = await productDetailPage.getProductQuantity();
        // 15.	Increase product quantity to 5
        await productDetailService.increaseQuantity(testData.product.keyboard.qty);
        // 16.	Select a color (if required).
        await productDetailPage.selectColorByColorName(translations.product_detail_page.product.attribute.color.silver);
        // 17.	Click Add to Cart.
        await productDetailPage.clickAddToCartButton();
        // 18.	Verify that the pop-up “Add to Cart” appears.
        await notificationPage.verifyAddToCartSuccess();
        // 19.	Open the mini cart.
        await menuBarPage.clickCartButton();
        // 20.	Select a product using the checkbox.
        await cartPage.clickSelectAllCheckbox();
        // 21.	Verify the product name.
        await cartPage.verifyProductIsAdded(earbudProductName);
        await cartPage.verifyProductIsAdded(keyboardProductName);
        await cartPage.verifyProductQuantityIsMatch(earbudProductName, earbudProductQty);
        await cartPage.verifyProductQuantityIsMatch(keyboardProductName, keyboardProductQty);
        // 22.	Verify the product price.
        await cartPage.verifyProductPriceIsMatch(earbudProductName, earbudProductPrice);
        await cartPage.verifyProductPriceIsMatch(keyboardProductName, keyboardProductPrice);
        // 23.	Verify the total price.
        const totalPrice = Number(earbudProductPrice) + Number(keyboardProductPrice);
        await cartPage.verifyTotalPriceIsMatch(String(totalPrice));
        // 24.	Click “Proceed to Checkout.”
        await cartPage.clickCheckoutButton();
        // 25.	Fill in the delivery address.
        await checkoutService.createNewAddress(testAddress);
        // 26.	Select QR Code as the payment method.
        await checkoutPage.selectQrCodePayment();
        await checkoutPage.clickPlaceOrderButton();
        // 27.	Click “I have paid.”
        await orderConfirmPage.clickPaidButton();
        // 28.	Verify that Payment Success is displayed.
        await notificationPage.verifyPaymentSuccess();
        // await app.page.pause();
    })

})
