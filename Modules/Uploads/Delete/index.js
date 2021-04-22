import { sendResponse } from '../../../Controller/Query.js';
import { ShopDocuments } from './ShopDocuments.js';
import { ProductMedia } from './ProductMedia.js';

const deleteMedia = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }

    let data = ctx.request.body;
    data = typeof data == 'string' ? JSON.parse(data) : data;
    const { upload_id, upload_type } = data;
    if (upload_type === 'ShopDocuments') {
        return ShopDocuments(ctx, user, upload_id);
    } else if (upload_type === 'shop') {
        return ProductMedia(ctx, user, upload_id);
    }
};

export default deleteMedia;
