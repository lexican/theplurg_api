import query from './Query.js';

export const abstractInfo = async (uid) => {
    let sql = `SELECT 
    uid,
    username,
    email,
    profile_pic,
    profile_bg,
    mariage_status,
    name,
    bio,
    nationality,
    first_native_state,
    first_native_lga,
    first_native_city,
    second_native_state,
    second_native_lga,
    second_native_city,
    current_location_state,
    current_location_lga,
    current_location_city
    FROM users WHERE uid = ${uid}`;
    const response = await query(sql).then((response) => response);
    const objectToReturn = response[0];
    objectToReturn.profile_pic = JSON.parse(objectToReturn.profile_pic);
    objectToReturn.profile_bg = JSON.parse(objectToReturn.profile_bg);
    return objectToReturn;
};

export const getUserByUsername = async (username) => {
    let sql = `SELECT uid FROM users WHERE username='${username}' AND status='1'`;
    let result = await query(sql).then((response) => response);
    if (result.length) return result[0].uid;
};

export const getLastMessageInChatHistory = async (c_id) => {
    let sql = `SELECT R.reply,R.user_id_fk,R.read_status FROM conversation_reply R WHERE R.c_id_fk=${c_id} ORDER BY R.cr_id DESC LIMIT 1`;
    let result = await query(sql).then((response) => response);
    if (result.length) return result[0];
};

//Shops Helper
