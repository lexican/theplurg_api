import query, { sendResponse } from '../../../Controller/Query.js';
import ShopFireWall from '../../../Firewalls/ShopFireWalls.js';
import { GetSubCategoryById } from '../../../Components/ProductAndServices/index.js';

export const createProductAndService = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = 'Session might have expired';
        return;
    }
    let data = ctx.request.body;
    data = typeof data == 'string' ? JSON.parse(data) : data;
    data.uid = user.uid;

    //Get the Categories by ID
    const category = [];
    let getCategory = JSON.parse(data.productCategory);
    for (let i = 0; i < getCategory.length; i++) {
        let GetSubCategory = await GetSubCategoryById(getCategory[i]);
        category.push({
            category: GetSubCategory.category,
            sub_category: GetSubCategory.sub_category,
        });
    }
    data.productCategory = JSON.stringify(category);

    //Authe
    const authe = await ShopFireWall(user.uid, data.shopID);
    if (typeof authe === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Access Denied');
        return;
    }

    let sql = 'INSERT INTO product_feeds SET ?';
    await query(sql, data).then((response) => response);

    let sql2 = `SELECT * FROM product_feeds WHERE shopID=${data.shopID} ORDER BY product_id DESC LIMIT 1`;
    const product = await query(sql2).then((response) => response);
    if (product) {
        ctx.status = 200;
        ctx.body = sendResponse(200, product);
    }
};

export default createProductAndService;
