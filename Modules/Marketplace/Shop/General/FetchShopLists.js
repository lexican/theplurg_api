import query, { sendResponse } from '../../../../Controller/Query.js';
import { ProductFeedsLoops } from '../../Helper/index.js';

export const FetchPopularShopFromUserLocal = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }
    const { shop_id } = JSON.parse(ctx.request.header['abstract-data']);

    let _sql = `SELECT * FROM shops`;
    let productFeeds = await query(_sql).then((response) => response);
    let result = await ProductFeedsLoops(user.uid, productFeeds);
    if (result) {
        ctx.status = 200;
        ctx.body = sendResponse(200, result);
    }
};
