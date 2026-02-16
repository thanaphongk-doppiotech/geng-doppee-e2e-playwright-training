import { request, expect } from '@playwright/test';
import { test } from '../../src/fixtures/app.fixtures';
import testData from '../../src/data/testdata/assignment_001.json';
import { testAddressApi } from '../../src/data/testdata/assignment_api';

test.describe('Assignment API', () => {
    test("Verify new register customer can be purchase product via api successfully", async ({ api, translations }) => {
        const apiContext = await request.newContext({
            // baseURL: process.env.LOCAL_URL;
        });
        // 1. Log in with valid username and password
        const loginBody = await api.login.login(apiContext, testData.test_user.email, testData.test_user.password);
        console.log('Login', loginBody);
        //     a. Verify response email
        expect(loginBody.user).toMatchObject({
            email: testData.test_user.email
        });
        // 2. search product list with (Search + Category) endpoint - example: /api/products?q=mouse&category=Electronics
        const mouseProductList = await api.product.getProductListByNameAndCategory(apiContext, testData.product.mouse.search_keyword, testData.product.category.electronics);
        console.log('Mouse product list', JSON.stringify(mouseProductList, null, 2));
        const availableMouseProducts = api.product.filterAvailableProduct(mouseProductList);
        console.log('Available mouse product list', JSON.stringify(mouseProductList, null, 2));
        //     a. Get product id from search product endpoint
        const mouseFirstProductId = availableMouseProducts[0].id;
        // 3. Get product details - /api/products/${productId}
        const wirelessMouseProductDetails = await api.product.getProductDetailByProductId(apiContext, mouseFirstProductId);
        //     a. Get product id & price in product details
        const wirelessMouseProductId = wirelessMouseProductDetails.product.id;
        const wirelessMousePrice = wirelessMouseProductDetails.product.price_cents_incl_vat;
        // 4. add product to cart
        const informationCart = await api.cart.getCart(apiContext);
        console.log('Information cart', JSON.stringify(informationCart, null, 2));
        await api.cart.removeAllItem(apiContext, informationCart);
        await api.cart.addProductById(apiContext, wirelessMouseProductId, testData.product.mouse.qty);
        // 5. search product list with (Search + Category)  endpoint - example : /api/products?q=mouse&category=Electronics
        const keyboardProductList = await api.product.getProductListByNameAndCategory(apiContext, testData.product.keyboard.search_keyword, testData.product.category.electronics);
        const availableKeyboardProducts = api.product.filterAvailableProduct(keyboardProductList);
        console.log('Available keyboard product list', JSON.stringify(availableKeyboardProducts, null, 2));
        // 6. Get product details number 2 - /api/products/${productId}
        const mechanicalKeyboardProductDetails = await api.product.getProductDetailByProductId(apiContext, availableKeyboardProducts[0].id);
        //     a. Get product id & price in product details
        const mechanicalKeyboardProductId = mechanicalKeyboardProductDetails.product.id;
        const mechanicalKeyboardPrice = mechanicalKeyboardProductDetails.product.price_cents_incl_vat;
        // 7. add product to cart
        await api.cart.addProductById(apiContext, mechanicalKeyboardProductId, testData.product.keyboard.qty);
        // 8. Get cart information - /api/cart
        const informationCartAfter = await api.cart.getCart(apiContext);
        console.log('Information cart after', JSON.stringify(informationCartAfter, null, 2));
        //     a. Get total price of cart
        const cartTotalPrice = informationCartAfter.total_incl_vat_cents;
        //     b. Verify total price Actual vs Expected
        const actualTotalPrice = (wirelessMousePrice * Number(testData.product.mouse.qty)) + (mechanicalKeyboardPrice * Number(testData.product.keyboard.qty));
        expect(cartTotalPrice).toEqual(actualTotalPrice);
        // 9. create address
        const addressDetails = await api.address.getAddress(apiContext);
        console.log('Address data', JSON.stringify(addressDetails, null, 2));
        const isAddressEmpty = api.address.verifyAddressIsEmpty(addressDetails);
        console.log('Is address empty', isAddressEmpty);
        if (isAddressEmpty) {
            await api.address.createAddress(apiContext, testAddressApi);
        }
        // 10. place an order - /api/orders/place
        const cartItemIds = informationCartAfter.items.map((i: any) => i.id);
        const orderPlaceData = await api.order.placeOrder(apiContext, cartItemIds);
        console.log('Place order data', JSON.stringify(orderPlaceData, null, 2));
        //     a. Verify total of cart - Actual
        expect.soft(orderPlaceData.order.total_incl_vat_cents).toEqual(actualTotalPrice);
        //     b. Verify status should be ‘ placed ‘
        expect(orderPlaceData.order.status).toBe(translations.order_confirm_page.lbl_placed);
    })
})
