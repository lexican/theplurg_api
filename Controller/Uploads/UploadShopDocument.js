import path from "path";
import {saveFile} from "../Utils.js";
import query from "../Query.js";

export const UploadShopDocument = async (file, type,captions, user) => {
  const uploadAction = async file => {
    let tail = file.name == "blob" ? "png" : file.name.split(".").pop();

    let generatePath = "/upload/shop-documents/"
    let fileNameConcat = Date.now();
    let filePath = path.join("/public" + generatePath,fileNameConcat + "." + tail);
    await saveFile(file.path, filePath).then(su => su);

    let  URL_Generate = { 
        path: generatePath + fileNameConcat + "." + tail,
        type: file.type
    };

    try {
      let data = {
        upload_path: JSON.stringify(URL_Generate),
        uid_fk: user.uid,
        upload_type: type
      };
      let sql = "INSERT INTO admin_shop_documents SET ?";
      await query(sql, data).then(response => response);
      let sql_last_id = `SELECT id,upload_path from admin_shop_documents WHERE uid_fk = ${user.uid} ORDER BY id DESC LIMIT 1`;
      let returnedIDD = await query(sql_last_id).then(response => response);
      return returnedIDD[0];
    } catch (error) {
      console.log(error);
    }
  };


  let numberOfMedia = file.length;
  if (typeof numberOfMedia == "undefined") numberOfMedia = 1;
  let uploadedFilesIDD = [];

  if (numberOfMedia > 1) {
    for (let i = 0; i < numberOfMedia; i++) {
      uploadedFilesIDD.push(uploadAction(file[i]));
    }
  } else {
    let uploads = await uploadAction(file);
    uploadedFilesIDD.push(uploads);
  }
  return uploadedFilesIDD;
};
