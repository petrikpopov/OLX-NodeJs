import { IUserCreate, IUsers, users } from "../data/user.js";
import { connectionDb } from "../config/mysql-config.js";
import { resolve } from "node:path";
import { rejects } from "node:assert";

export class User {
    static addRegisterUser(users:IUserCreate):Promise<number> {
        return new Promise((resolve, reject) => {
            connectionDb.query(
                "INSERT INTO users (login, email, password) VALUES(?, ?, ?)",
                [users.login, users.email, users.password],
                (err, res:any) => {
                    if (err) {
                        return reject(new Error(err.message));
                    }
                    else {
                        return resolve(res.insertId);
                    }
                }
            )
        })
    }

    static getAllUsers(): Promise<IUsers[]> {
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