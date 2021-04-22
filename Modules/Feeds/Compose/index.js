import query, { sendResponse } from "../../../Controller/Query.js";
import create_post_context from "./context.js";

const create_post = async ctx => {
  const user = ctx.state.user;
  if (typeof user === "undefined") {
    ctx.status = 406;
    ctx.body = sendResponse(406, "Session might have expired")
    return;
  }

  let data = ctx.request.body;
  data = typeof data == "string" ? JSON.parse(data) : data;

  const { feedContent, uploads, parents, immediate_parent } = data;

  const sqlData = {
    uid_fk: user.uid,
    feedContent: feedContent,
    uploads: JSON.stringify(uploads),
    parents: JSON.stringify(parents),
    immediate_parent: JSON.stringify(immediate_parent),
    created: Date.now()
  };

  let sql = "INSERT INTO feeds SET ?";
  let create = await query(sql, sqlData).then(response => response);
  if (create) {
    const fetched = await create_post_context(user.uid);
    ctx.status = 200;
    ctx.body = sendResponse(200, fetched);
  }
};

export default create_post;
