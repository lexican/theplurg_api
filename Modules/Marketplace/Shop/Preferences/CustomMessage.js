import query, { sendResponse } from '../../../../Controller/Query.js';

export const SetCustomMessage = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }

    let data = ctx.request.body;
    data = typeof data == 'string' ? JSON.parse(data) : data;
    const { custom_message, shop_id } = data;

    let _sql = `UPDATE shops_preferences SET custom_message = '${custom_message}' WHERE shop_id=${shop_id}`;
    let update = await query(_sql).then((response) => response);
    if (update) {
        ctx.status = 200;
        ctx.body = sendResponse(200, 'success');
    }
};

export const GetCustomMessage = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }
    const { shop_id } = JSON.parse(
       ctx.request.header["abstract-data"]
    );

    let _sql = `SELECT * FROM shops_preferences WHERE shop_id=${shop_id}`;
    let response = await query(_sql).then((response) => response);
    if (response) {
        ctx.status = 200;
        ctx.body = sendResponse(200, response);
    }
};
