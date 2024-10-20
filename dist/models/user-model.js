import { connectionDb } from "../config/mysql-config.js";
export class User {
    static addRegisterUser(users) {
        return new Promise((resolve, reject) => {
            connectionDb.query("INSERT INTO users (login, email, password) VALUES(?, ?, ?)", [users.login, users.email, users.password], (err, res) => {
                if (err) {
                    return reject(new Error(err.message));
                }
                else {
                    return resolve(res.insertId);
                }
            });
        });
    }
    static getAllUsers() {
        return new Promise((resolve, reject) => {
            connectionDb.query("SELECT * FROM users", (err, results) => {
                if (err) {
                    return reject(new Error(err.message));
                }
                else {
                    resolve(results);
                }
            });
        });
    }
}
