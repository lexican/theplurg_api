import query, { sendResponse } from '../../../Controller/Query.js';

export default async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }
    const { productID } = JSON.parse(ctx.request.header['abstract-data']); //work with api now

    console.log(productID);

    let sql = `SELECT * FROM product_feeds WHERE product_id=${productID}`; //Product fetch sql here
    const fetched = await query(sql).then((response) => response);
    console.log('fetched: ', fetched);
    ctx.body = JSON.stringify({ statusCode: 200, response: fetched }); //product_feeds table...
    ctx.status = 200;
};
