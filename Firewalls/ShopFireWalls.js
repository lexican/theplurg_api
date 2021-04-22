import query from "../Controller/Query.js";

const ShopFireWall = async (user_id,shop_id) => {
  const sql = `select * from shop_manager WHERE uid = ${user_id} AND shop_id = ${shop_id}`;
  const shopManager = await query(sql).then(response => response);
  return  shopManager[0];
};
export default ShopFireWall;
