import query from "../Controller/Query.js";

const UserToken = async (ctx, next) => {
  const key = ctx.request.header["authorization"];
  const user_token = key.split(":")[1];
  const sql = `select uid,username,ip_address,gender from users  WHERE token = ?`;
  const user = await query(sql, [user_token]).then(response => response);
  
  ctx.state.user = user[0];
  return next();
};

export default UserToken;
