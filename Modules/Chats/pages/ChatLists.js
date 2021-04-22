import query, { sendResponse } from "../../../Controller/Query.js";
import { getLastMessageInChatHistory } from "../../../Controller/Helpers.js"
import {profileImageSlipt} from '../../../Controller/Utils.js'

export const ChatLists = async ctx => {
  const { uid } = ctx.state.user;
  const { last_time } = JSON.parse(ctx.request.header["abstract-data"]);

  let morequery = "";
  if (last_time) {
    morequery = ` and c.time<'${last_time}'`;
  }

  let sql = `SELECT DISTINCT u.uid,c.c_id,u.name,u.profile_pic,u.username,u.email,c.time
            FROM conversation c, users u, conversation_reply r
            WHERE CASE
            WHEN c.user_one = ${uid}
            THEN c.user_two = u.uid
            WHEN c.user_two = ${uid}
            THEN c.user_one= u.uid
            END
            AND (
            c.user_one =${uid}
            OR c.user_two =${uid}
            ) AND c.c_id=r.c_id_fk
            ORDER BY c.time DESC LIMIT 15`;
  let getConversationLists = await query(sql).then(response => response);
  if (getConversationLists) {
    await Promise.all(
      getConversationLists.map(async data => {
        data.lastMessageInChatHistory = await getLastMessageInChatHistory(
          data.c_id
        );
        return data;
      })
    );
  }

    ctx.status = 200;
    ctx.body = sendResponse(200, getConversationLists);
};

export const ChatSenderDetails =  async ctx => {
    const { uid } = ctx.state.user;
    const { c_id } = JSON.parse(ctx.request.header["abstract-data"]);
    let sql = `SELECT * FROM conversation WHERE c_id=${c_id}`;
    let result = await query(sql).then(response => response);
    let responserID = ""
    if(result[0].user_one === uid){
      responserID = result[0].user_two
    }else {
      responserID = result[0].user_one
    }
    let sql2 = `SELECT uid,name,profile_pic,username,email FROM users WHERE uid=${responserID} `;
     let returnResult = await query(sql2).then(response => response);
     returnResult[0].c_profile_pic = profileImageSlipt(returnResult[0].profile_pic)
    ctx.status = 200;
    ctx.body = sendResponse(200, returnResult);
}
