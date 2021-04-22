import pool from "./Connection.js";

const Query = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) resolve(err);
      connection.query(sql, val, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        connection.release();
      });
    });
  });
};

export const sendResponse = (status_code, response) =>
         JSON.stringify({ statusCode: status_code, response: response });

export default Query;
