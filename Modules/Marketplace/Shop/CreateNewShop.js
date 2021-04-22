import query, { sendResponse } from '../../../Controller/Query.js';
import { GetSubCategoryById } from '../../../Components/ProductAndServices/index.js';
import { GetNationalLgaById } from '../../../Components/Nationality/index.js';

const CreateNewShop = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }

    let data = ctx.request.body;
    data = typeof data == 'string' ? JSON.parse(data) : data;
    data.creator_id = user.uid;

    //Get the Categories by ID
    const services = [];
    let getServices = JSON.parse(data.services);
    for (let i = 0; i < getServices.length; i++) {
        let GetSubCategory = await GetSubCategoryById(getServices[i]);
        services.push({
            category: GetSubCategory.category,
            sub_category: GetSubCategory.sub_category,
        });
    }
    data.services = JSON.stringify(services);

    //Get the Shop Nationality
    const nationality = await GetNationalLgaById(data.nationality);
    data.nationality = JSON.stringify(nationality);

    let sql = 'INSERT INTO shops SET ?';
    let create = await query(sql, data).then((response) => response);

    if (create) {
        let sql2 = `SELECT shop_id FROM shops WHERE creator_id=${user.uid}  ORDER BY shop_id DESC LIMIT 1`;
        let getLastInsertedRow = await query(sql2).then((response) => response);

        let data2 = {
            shop_id: getLastInsertedRow[0].shop_id,
            uid: user.uid,
            role: 'Admin',
        };

        let sql3 = 'INSERT INTO shop_manager SET ?';
        let result = await query(sql3, data2).then((response) => response);

        if (result) {
            ctx.status = 200;
            ctx.body = sendResponse(200, 'success');
        }
    }
};

export default CreateNewShop;
