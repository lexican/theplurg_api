import query, { sendResponse } from "../../../Controller/Query.js";

const UpdateShopDetails = async ctx => {
  const user = ctx.state.user;
  if (typeof user === "undefined") {
    ctx.status = 406;
    ctx.body = sendResponse(406, "Session might have expired")
    return;
  }

  let data = ctx.request.body;
  data = typeof data == "string" ? JSON.parse(data) : data;
   const {
       shop_name,
       shop_state,
       shop_lga,
       shop_full_address,
       services
   } = data

    let _sql = `UPDATE shops SET 
        shop_name = '${shop_name}', 
        shop_state= '${shop_state}', 
        shop_lga= '${shop_lga}', 
        shop_full_address= '${shop_full_address}', 
        services= '${services}' 
    `;
  let update = await query(_sql).then(response => response);
  if(update){
        ctx.status = 200;
        ctx.body = sendResponse(200, "success")
     }

};

export default UpdateShopDetails;
