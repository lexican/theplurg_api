import feeds_loop from '../components/feeds_loops.js'
import query from "../../../Controller/Query.js";

const create_post_context = async uid => {
  let sql_last_id = `SELECT * from feeds WHERE uid_fk = ${uid} ORDER BY feed_id DESC LIMIT 1`;
  let feed = await query(sql_last_id).then(response => response);
  return await feeds_loop(uid, feed);
};

export default create_post_context;
