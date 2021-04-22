import Router from '@koa/router';
const router = new Router();

//import pages
import CreateNewShop from './Shop/CreateNewShop.js';
import UpdateShopDetails from './Shop/UpdateShopDetails.js';
import AddNewProduct from './Shop/AddNewProduct.js';
import ShopAccessControl from './Shop/ShopAccessControl.js';

import { SetCustomMessage, GetCustomMessage } from './Shop/Preferences/CustomMessage.js';
import { GetAllShopProduct } from './Shop/Products/GetAllShopProduct.js';
import { DeleteProduct } from './Shop/Products/DeleteProduct.js';

import { GetRecommendedProductLists } from './Market/Products/FetchProducts.js';
import { AddToCart, GetAvailableCarts, CheckIfAlreadyAddedToCart } from './Market/Products/Carts.js';

//routes Declarations
router.post('/v1/marketplace/create_new_shop', CreateNewShop);

router.post('/v1/shop/add_new_product', AddNewProduct);
router.post('/v1/shop/update_shop_details', UpdateShopDetails);
router.get('/v1/shop/shop_access_control', ShopAccessControl);

router.post('/v1/shop/set_custom_message', SetCustomMessage);
router.get('/v1/shop/get_custom_message', GetCustomMessage);
router.get('/v1/shop/get_all_shop_product', GetAllShopProduct);
router.post('/v1/shop/delete_product', DeleteProduct);

router.get('/v1/market/get_recommended_product_lists', GetRecommendedProductLists);
router.post('/v1/market/add_to_cart', AddToCart);
router.get('/v1/market/get_available_carts', GetAvailableCarts);
router.post('/v1/market/check_if_already_added_to_cart', CheckIfAlreadyAddedToCart);

export default router;
