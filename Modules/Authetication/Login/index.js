import query from "../../../Controller/Query.js"
import crypto from "crypto";

const md5 = data =>
  crypto
    .createHash("md5")
    .update(data)
    .digest("hex");

const login = async ctx => {
  const data = ctx.request.body;
  const { username, password } = data;
  let sql = `SELECT token from users WHERE username='${username}' AND password='${md5(
    password
  )}'`;
  let result = await query(sql).then(response => response);
  let authe = {};
  authe.token = "";
  if (result.length) authe.token = result[0].token;
  ctx.body = JSON.stringify({ statusCode: 200, response: authe });
  ctx.status = 200;
};

export default login;
