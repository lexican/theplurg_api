import { abstractInfo } from "../../../Controller/Helpers.js";
import query from "../../../Controller/Query.js"

export const listOfUserThatReactedToThisPost = async feed_id => {
  let sql = `SElECT react_id,ouid_fk from feeds_react WHERE feed_id_fk=${feed_id}`;
  const result = await query(sql).then(response => response);
  let users = [];
  if (result.length > 0) {
    for (let i = 0; i < result.length; i++) {
      let user = await abstractInfo(result[i].ouid_fk);
      users.push(user);
    }
  }
  return users;
};

export const listOfUserThatSharedToThisPost = async feed_id => {
  let sql = `SElECT share_id,ouid_fk from feeds_share WHERE feed_id_fk=${feed_id}`;
  const result = await query(sql).then(response => response);
  let users = [];
  if (result.length > 0) {
    for (let i = 0; i < result.length; i++) {
      let user = await abstractInfo(result[i].ouid_fk);
      users.push(user);
    }
  }
  return users;
};

export const userHasSharedThefeeds = async (uid, feed_id) => {
  let sql = `SElECT share_id from feeds_share WHERE feed_id_fk=${feed_id} AND  ouid_fk=${uid}`;
  const result = await query(sql).then(response => response);
  let shared = false;
  if (result.length > 0) shared = true;
  return shared;
};

export const userHasReactedToThisPost = async (uid, feed_id) => {
  let sql = `SElECT react_id,reactionType from feeds_react WHERE feed_id_fk=${feed_id} AND  ouid_fk=${uid}`;
  const result = await query(sql).then(response => response);
  let reacted = [];
  if (result.length > 0) reacted = result;
  return reacted;
};
