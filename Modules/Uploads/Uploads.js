import MediaUpload from '../../Controller/Uploads/index.js';
import query, { sendResponse } from '../../Controller/Query.js';
import ShopFireWall from '../../Firewalls/ShopFireWalls.js';

const uploadMedia = async (ctx) => {
    const user = ctx.state.user;
    if (typeof user === 'undefined') {
        ctx.status = 406;
        ctx.body = sendResponse(406, 'Session might have expired');
        return;
    }
    let file = ctx.request.files.media;
    let data = ctx.request.body;
    data = typeof data == 'string' ? JSON.parse(data) : data;
    const { type, captions, shopID } = data;

    //Autheticate
    // if (type === 'sales') {
    //     const authe = await ShopFireWall(user.uid, shopID);
    //     if (typeof authe === 'undefined') {
    //         ctx.status = 406;
    //         ctx.body = sendResponse(406, 'Access Denied');
    //         return;
    //     }
    // }

    let uploadedFilesIDD = await MediaUpload(file, type, captions, user, shopID);
    console.log(uploadedFilesIDD);

    if (uploadedFilesIDD.length) {
        if (data.type === 'profile_picture') {
            try {
                let uppdate_sql = `UPDATE users SET profile_pic='${uploadedFilesIDD[0].upload_path}' WHERE uid=${user.uid}`;
                let response = await query(uppdate_sql).then((response) => response);
                if (response) {
                    ctx.status = 200;
                    ctx.body = sendResponse(200, uploadedFilesIDD);
                } else {
                    ctx.status = 409;
                    ctx.body = sendResponse(409, 'something not right');
                }
            } catch (error) {
                console.log(error);
            }
        } else if (data.type === 'background_image') {
            try {
                let uppdate_sql = `UPDATE users SET profile_bg='${uploadedFilesIDD[0].upload_path}' WHERE uid=${user.uid}`;
                let response = await query(uppdate_sql).then((response) => response);
                if (response) {
                    ctx.status = 200;
                    ctx.body = sendResponse(200, uploadedFilesIDD);
                } else {
                    ctx.status = 409;
                    ctx.body = sendResponse(409, 'something not right');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            ctx.status = 200;
            ctx.body = sendResponse(200, uploadedFilesIDD);
        }
    } else {
        ctx.status = 409;
        ctx.body = sendResponse(409, 'something not right');
    }
};

export default uploadMedia;
