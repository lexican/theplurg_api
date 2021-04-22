import query, { sendResponse } from "../../../Controller/Query.js";
import fs from "fs";
import appRoot from "app-root-path";

export const ShopDocuments = async (ctx,user,upload_id) => {
  let sql = `SELECT upload_path FROM admin_shop_documents WHERE id=${upload_id} AND uid_fk=${user.uid}`;
  let result = await query(sql).then(response => response);
  let upload_path = result;
  if (typeof upload_path === "undefined") {
    ctx.body = "deleted";
    ctx.status = 200;
  } else {
        let path = JSON.parse(upload_path[0].upload_path).path
        fs.unlink(appRoot + "/public/" + path, e => console.log(e));
        if (fs.accessSync(appRoot + "/public/" + path, fs.constants.F_OK)) {
            ctx.body = sendResponse(424, { status: "failed to delete" });
            ctx.status = 424;
        } else {
            let sql = `DELETE FROM admin_shop_documents WHERE id=${upload_id} AND uid_fk=${user.uid}`;
            await query(sql).then(response => response);
            ctx.body = sendResponse(200, { status: "deleted" });
            ctx.status = 200;
        }
  }
};
