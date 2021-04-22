import path from "path";
import resizer from "node-image-resizer";
import appRoot from "app-root-path";
import VideoThumbnail from "./VideoThumbnail.js";
import {
  upload,
  mkdirFile,
  saveFile,
  imageExtention,
  videoExtention,
  audioExtention
} from "./Utils.js";
import query from "./Query.js";

const MediaUpload = async (file, type,captions, user, shopID = "") => {
  const uploadAction = async file => {
    let tail = file.name == "blob" ? "png" : file.name.split(".").pop();

    let uploadFolder = upload.IMAGE;
    if (imageExtention.includes(tail)) {
      uploadFolder = upload.IMAGE;
    } else if (videoExtention.includes(tail)) {
      uploadFolder = upload.VIDEO;
    } else if (audioExtention.includes(tail)) {
      uploadFolder = upload.AUDIO;
    }

    let generatePath = ""
    if(type == "ShopDocuments"){
      generatePath =
      "/upload/shop-documents/"
    }else if(type == "sales"){
        generatePath =
      "/upload/sales/" + shopID +"/"
    }else {
      generatePath =
      "/upload/" + user.gender + "/" + user.username + uploadFolder;
    }
    let fileNameConcat = Date.now();

    let filePath = path.join(
      "/public" + generatePath,
      fileNameConcat + "." + tail
    );
    await mkdirFile("/public" + generatePath + "resize/"); //Create a file directory
    await saveFile(file.path, filePath).then(su => su);

    let URL_Generate = {}

    if (imageExtention.includes(tail)) {
      const setup = {
        all: {
          path: appRoot + "/public" + generatePath + "resize/",
          quality: 50
        },
        versions: [
          {
            prefix: "big_",
            width: 768,
            height: 768
          },
          {
            prefix: "medium_",
            width: 512,
            height: 256
          },
          {
            quality: 100,
            prefix: "small_",
            width: 128,
            height: 64
          }
        ]
      };

      // create thumbnails
    await resizer(
        appRoot +
          "/public" +
          generatePath +
          "original/" +
          fileNameConcat +
          "." +
          tail,
        setup
      );

    URL_Generate = {
      original: generatePath + "original/" + fileNameConcat + "." + tail,
      big: generatePath + "resize/big_" + fileNameConcat + "." + tail,
      medium: generatePath + "resize/medium_" + fileNameConcat + "." + tail,
      small: generatePath + "resize/small_" + fileNameConcat + "." + tail,
      type: file.type
    };
    } else if  (videoExtention.includes(tail)) {
      const vt = new VideoThumbnail({
        sourcePath:
          appRoot +
          "/public" +
          generatePath +
          "original/" +
          fileNameConcat +
          "." +
          tail,
        thumbnailPath: appRoot + "/public" + generatePath + "thumbnail/"
      });

      vt.generate().then(data => {
        console.log('data', data)
      });

      URL_Generate = {
        path: generatePath + "/" + fileNameConcat + "." + tail,
        type: file.type
      };
    }else {
      URL_Generate = { 
        path: generatePath + "/" + fileNameConcat + "." + tail,
        type: file.type
      };
    }

    try {
      let data = {
        upload_path: JSON.stringify(URL_Generate),
        upload_name: fileNameConcat + "." + tail,
        uid_fk: user.uid,
        created: Date.now(),
        upload_type: type,
        caption: captions
      };
      let sql = "INSERT INTO user_uploads SET ?";
      await query(sql, data).then(response => response);
      let sql_last_id = `SELECT id,upload_path,caption from user_uploads WHERE uid_fk = ${user.uid} ORDER BY id DESC LIMIT 1`;
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

export default MediaUpload;
