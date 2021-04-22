import {
  abstractInfo,
  getUserByUsername
} from "../../../Controller/Helpers.js";
import {sendResponse} from '../../../Controller/Query.js'

export const UserAbstractProfile = async ctx => {
  let username = false;
  if (ctx.request.header["abstract-data"]) {
    username = JSON.parse(ctx.request.header["abstract-data"]).username;
  }
  if (!username) username = ctx.state.user.username;
  const uid = await getUserByUsername(username);
  const response = await abstractInfo(uid);
  ctx.status = 200;
   ctx.body = sendResponse(200, response);
};
