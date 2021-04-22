import mysql from "mysql";
let pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'theplurg.com.v1',
});

export default pool;
