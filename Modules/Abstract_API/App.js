import Router from '@koa/router';
const router = new Router();

//import pages
import { NationStates, NationLGA } from './pages/Nations.js';
import { UserAbstractProfile } from './pages/Users.js';

import {
    ProductsAndServicesCategories,
    ProductsAndServicesSubCategories,
    GetAllServicesCategory,
    GetOnlyServiceCategory,
} from './pages/ProductsAndServices.js';

//routes Declarations
router.get('/v1/nations/states', NationStates);
router.get('/v1/nations/lga', NationLGA);

router.get('/v1/user_abstract_profile', UserAbstractProfile);

router.get('/v1/product_and_services/categories', ProductsAndServicesCategories);
router.get('/v1/product_and_services/sub_categories', ProductsAndServicesSubCategories);
router.get('/v1/product_and_services/get_all_services_category', GetAllServicesCategory);
router.get('/v1/product_and_services/get_only_services_category', GetOnlyServiceCategory);

export default router;

