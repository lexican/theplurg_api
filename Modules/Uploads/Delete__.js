import query, { sendResponse } from "../../Controller/Query.js";
import fs from "fs";
import appRoot from "app-root-path";

const deleteMedia = async ctx => {
  const user = ctx.state.user;
  if (typeof user === "undefined") {
    ctx.status = 406;
    ctx.body = sendResponse(406, "Session might have expired");
    return;
  }

  let data = ctx.request.body;
  data = typeof data == "string" ? JSON.parse(data) : data;
  const { upload_id, upload_type } = data;

  let sql = `SELECT upload_path FROM user_uploads WHERE id=${upload_id} AND uid_fk=${user.uid}`;
  let result = await query(sql).then(response => response);
  let upload_path = result;

  if (typeof upload_path === "undefined") {
    ctx.body = "deleted";
    ctx.status = 200;
  } else {

    if(upload_type === "ShopDocuments"){
      let path = JSON.parse(upload_path[0].upload_path).path
      fs.unlink(appRoot + "/public/" + path, e => console.log(e));
      if (fs.accessSync(appRoot + "/public/" + path, fs.constants.F_OK)) {
        ctx.body = sendResponse(424, { status: "failed to delete" });
        ctx.status = 424;
      } else {
        let sql = `DELETE FROM user_uploads WHERE id=${upload_id} AND uid_fk=${user.uid}`;
        await query(sql).then(response => response);
        ctx.body = sendResponse(200, { status: "deleted" });
        ctx.status = 200;
      }
    }else {
      let path = JSON.parse(upload_path[0].upload_path);
      fs.unlink(appRoot + "/public/" + path.original, e => console.log(e));
      fs.unlink(appRoot + "/public/" + path.big, e => console.log(e));
      fs.unlink(appRoot + "/public/" + path.medium, e => console.log(e));
      fs.unlink(appRoot + "/public/" + path.small, e => console.log(e));

      if (fs.accessSync(appRoot + "/public/" + path.small, fs.constants.F_OK)) {
        ctx.body = sendResponse(424, { status: "failed to delete" });
        ctx.status = 424;
      } else {
        let sql = `DELETE FROM user_uploads WHERE id=${upload_id} AND uid_fk=${user.uid}`;
        await query(sql).then(response => response);
        ctx.body = sendResponse(200, { status: "deleted" });
        ctx.status = 200;
      }

    }
  }
};

export default deleteMedia;
