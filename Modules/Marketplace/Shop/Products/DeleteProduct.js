import query, { sendResponse } from '../../../../Controller/Query.js';
import fs from 'fs';
import appRoot from 'app-root-path';

export const DeleteProduct = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }

    let data = ctx.request.body;
    data = typeof data == 'string' ? JSON.parse(data) : data;
    const product_id = data.product_id;
    const _getProductDetail = await query(
        `SELECT productImage FROM product_feeds WHERE product_id = ${product_id}`,
    ).then((response) => response);

    const productImages = JSON.parse(_getProductDetail[0].productImage);
    for (let i = 0; i < productImages.length; i++) {
        let upload_path = await query(
            `SELECT upload_path,resizer_big, resizer_medium,resizer_small FROM shop_uploads WHERE id=${productImages[i]}`,
        ).then((response) => response);
        fs.unlink(appRoot + '/public' + upload_path[0].upload_path, (e) => console.log(e));
        fs.unlink(appRoot + '/public' + upload_path[0].resizer_big, (e) => console.log(e));
        fs.unlink(appRoot + '/public' + upload_path[0].resizer_medium, (e) => console.log(e));
        fs.unlink(appRoot + '/public' + upload_path[0].resizer_small, (e) => console.log(e));
        await query(`DELETE FROM shop_uploads WHERE id=${productImages[i]}`).then((response) => response);
    }

    await query(`DELETE FROM product_feeds WHERE product_id=${product_id}`).then((response) => response);
    ctx.body = sendResponse(200, { status: 'deleted' });
    ctx.status = 200;
};
