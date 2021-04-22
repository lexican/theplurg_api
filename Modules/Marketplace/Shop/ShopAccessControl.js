import query, { sendResponse } from "../../../Controller/Query.js";

const ShopAccessControl = async ctx => {
  const user = ctx.state.user;
  if (typeof user === "undefined") {
    ctx.status = 406;
    ctx.body = sendResponse(406, "Session might have expired")
    return;
  }
  const { storeID } = JSON.parse(
       ctx.request.header["abstract-data"]
    );

    let sql = `SELECT role FROM shop_manager WHERE shop_id=${storeID} and uid=${user.uid}`;
    const fetched = await query(sql).then(response => response);
    ctx.body = JSON.stringify({ statusCode: 200, response: fetched });
    ctx.status = 200;
};

export default ShopAccessControl;
