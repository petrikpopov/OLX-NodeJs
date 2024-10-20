import mysql from "mysql2";
export const connectionDb = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password:"12345678",
    database:"OLX"
});
