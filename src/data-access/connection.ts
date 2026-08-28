import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: import.meta.env.DB_HOST,
    port: Number(import.meta.env.DB_PORT),
    user: import.meta.env.DB_USER,
    password: import.meta.env.DB_PASSWORD,
    database: import.meta.env.DB_NAME
});