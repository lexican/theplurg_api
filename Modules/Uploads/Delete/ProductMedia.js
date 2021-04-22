import query, { sendResponse } from '../../../Controller/Query.js';
import fs from 'fs';
import appRoot from 'app-root-path';

export const ProductMedia = async (ctx, user, upload_id) => {
    let sql = `SELECT upload_path,resizer_big, resizer_medium,resizer_small FROM shop_uploads WHERE id=${upload_id} AND uid_fk=${user.uid}`;
    let result = await query(sql).then((response) => response);
    let upload_path = result[0];
    if (typeof upload_path === 'undefined') {
        ctx.body = 'deleted';
        ctx.status = 200;
    } else {
        fs.unlink(appRoot + '/public' + upload_path.upload_path, (e) => console.log(e));
        fs.unlink(appRoot + '/public' + upload_path.resizer_big, (e) => console.log(e));
        fs.unlink(appRoot + '/public' + upload_path.resizer_medium, (e) => console.log(e));
        fs.unlink(appRoot + '/public' + upload_path.resizer_small, (e) => console.log(e));
        let sql = `DELETE FROM shop_uploads WHERE id=${upload_id} AND uid_fk=${user.uid}`;
        await query(sql).then((response) => response);
        ctx.body = sendResponse(200, { status: 'deleted' });
        ctx.status = 200;
    }
};
