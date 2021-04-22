import path from 'path';
import appRoot from 'app-root-path';
// import { v4 as uuidv4 } from 'uuid';

// import pkg from 'uuid';
// const { v4: uuidv4 } = pkg;

import { v4 as uuidv4 } from 'uuid';

import { saveFile, mkdirFile } from '../Utils.js';
import query from '../Query.js';

import ImageThumbnail from '../ImageThumbnail.js';

export const UploadProductMedia = async (file, type, user, shopID) => {
    const uploadAction = async (file) => {
        let tail = file.name == 'blob' ? 'png' : file.name.split('.').pop();
        let generatePath = `/upload/shop/${shopID}/`;
        let fileNameConcat = Date.now() + uuidv4();
        let filePath = path.join('/public' + generatePath, fileNameConcat + '.' + tail);
        await mkdirFile('/public' + generatePath + 'resize/');
        await mkdirFile('/public' + generatePath);
        await saveFile(file.path, filePath).then((su) => su);

        const imagPath = appRoot + '/public' + generatePath + fileNameConcat + '.' + tail;
        const resize = await ImageThumbnail(imagPath, generatePath, fileNameConcat, tail);

        try {
            let data = {
                upload_path: generatePath + fileNameConcat + '.' + tail,
                upload_name: fileNameConcat + '.' + tail,
                resizer_big: resize.big,
                resizer_medium: resize.medium,
                resizer_small: resize.small,
                shop_id: shopID,
                uid_fk: user.uid,
                file_type: file.type,
            };
            let sql = 'INSERT INTO shop_uploads SET ?';
            await query(sql, data).then((response) => response);
            let sql_last_id = `SELECT * from shop_uploads WHERE uid_fk = ${user.uid} and shop_id=${shopID} ORDER BY id DESC LIMIT 1`;
            let returnedIDD = await query(sql_last_id).then((response) => response);
            return returnedIDD[0];
        } catch (error) {
            console.log(error);
        }
    };

    let numberOfMedia = file.length;
    if (typeof numberOfMedia == 'undefined') numberOfMedia = 1;
    let uploadedFilesIDD = [];

    if (numberOfMedia > 1) {
        for (let i = 0; i < numberOfMedia; i++) {
            uploadedFilesIDD.push(await uploadAction(file[i]));
        }
    } else {
        let uploads = await uploadAction(file);
        uploadedFilesIDD.push(uploads);
    }
    return uploadedFilesIDD;
};
