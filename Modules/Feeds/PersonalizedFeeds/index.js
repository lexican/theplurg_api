import feeds_loop from "../components/feeds_loops.js";
import query, { sendResponse } from "../../../Controller/Query.js";

const PersonalizedFeeds = async (ctx) => {
  const user = ctx.state.user;
  if (typeof user === "undefined") {
    ctx.status = 406;
    ctx.body = sendResponse(406, "Session might have expired");
    return;
  }
  const uid = user.uid;
  const { last_id } = JSON.parse(ctx.request.header["abstract-data"]);
  let morequery;
  let morequery_share;
  let morequery_react;
  let perpage = 10;

  if (last_id) {
    morequery_share = ` and S.created< ${last_id}`;
    morequery_react = ` and L.created< ${last_id}`;
    morequery = ` and F.created< ${last_id}`;
  }

  let share_sql = `SELECT share_id FROM feeds_share`;
  let react_sql = `SELECT react_id FROM feeds_react`;

  try {
    let shares = await query(share_sql).then(response => response);
    let reacts = await query(react_sql).then(response => response);
    let feeds_query;

    if (shares || reacts) {
      feeds_query = `
            SELECT DISTINCT feed_id,uid_fk,feedContent, created, like_count,comment_count,share_count, username,uploads, share_uid,share_ouid , like_uid,like_ouid
            FROM
            (SELECT DISTINCT F.feed_id,F.uid_fk,F.feedContent, S.created, F.like_count,F.comment_count,F.share_count, U.username,F.uploads, S.uid_fk as share_uid,S.ouid_fk as share_ouid , '0' as like_uid,'0' as like_ouid
            FROM
            feeds F, users U, followers FO,feeds_share S
            WHERE
            FO.user_one=${uid} AND
            U.uid = FO.user_one AND
            U.status='1' AND
            FO.user_two != S.ouid_fk AND
            S.uid_fk  = FO.user_two AND
            F.uid_fk = S.ouid_fk AND FO.role='following' AND
            S.feed_id_fk = F.feed_id group by F.feed_id
            UNION ALL
            SELECT DISTINCT F.feed_id, F.uid_fk,F.feedContent, L.created, F.like_count,F.comment_count,F.share_count, U.username,F.uploads,'0' AS share_uid, '0' as share_ouid , L.uid_fk as like_uid,L.ouid_fk as like_ouid
            FROM
            feeds F, users U, followers FO,feeds_react L
            WHERE
            FO.user_one=${uid} AND
            U.uid = FO.user_one AND
            U.status='1' AND
            FO.user_two != L.ouid_fk AND
            L.uid_fk  = FO.user_two AND
            F.uid_fk = L.ouid_fk AND FO.role='following' AND L.uid_fk<>L.ouid_fk AND
            L.feed_id_fk = F.feed_id  group by F.feed_id
            UNION ALL
            SELECT DISTINCT F.feed_id, F.uid_fk,  F.feedContent, F.created, F.like_count,F.comment_count,F.share_count, U.username,F.uploads, '0' AS share_uid, '0' as share_ouid, '0' as like_uid,'0' as like_ouid
            FROM
            feeds F, users U, followers FO
            WHERE FO.user_one=${uid} AND U.status='1' AND F.uid_fk=U.uid AND F.uid_fk = FO.user_two
            group by F.feed_id
            UNION ALL
            SELECT DISTINCT F.feed_id, F.uid_fk,  F.feedContent, F.created, F.like_count,F.comment_count,F.share_count, U.username,F.uploads, '0' AS share_uid, '0' as share_ouid, '0' as like_uid,'0' as like_ouid
            FROM
            feeds F, users U, group_users G
            WHERE G.uid_fk=${uid}
            AND U.status='1'
             AND F.uid_fk=U.uid  group by F.feed_id )t GROUP BY feed_id ORDER BY created DESC LIMIT ${perpage}
        
        `;
    } else {
      feeds_query = `
            SELECT F.feed_id,F.parents, F.uid_fk, F.feedContent, F.created,F.like_count,F.comment_count, U.username,F.uploads, '0' AS share_uid, '0' as share_ouid, '0' as like_uid,'0' as like_ouid
            FROM feeds F, users U, followers FO  WHERE U.status='1' AND F.uid_fk=U.uid AND  F.uid_fk = FO.user_two
            AND FO.user_one=:uid  ORDER BY F.feed_id DESC LIMIT ${perpage}
        `;
    }
    const feedsResult = await query(feeds_query).then(response => response);
    const feedsToReturn = await feeds_loop(uid, feedsResult);
    ctx.status = 200;
    ctx.body = sendResponse(200, feedsToReturn);
  } catch (error) {
    console.log(error);
  }
};

export default PersonalizedFeeds;
