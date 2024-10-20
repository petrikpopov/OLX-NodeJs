import express from "express";
import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { connectionDb } from "./config/mysql-config.js";
import userRegisterRouter from "./routes/user-rotes.js";

const PORT = 3443;
const _dirname = import.meta.dirname;

const run = () => {
    const app = express();
    const option = {
        key: fs.readFileSync(path.join(_dirname, "..", "cert", "key.pem")),
        cert: fs.readFileSync(path.join(_dirname, "..", "cert", "cert.pem"))
    };
    https.createServer(option, app).listen(PORT, ()=>console.log(`Server is running https://127.0.0.1`));

    app.use(express.json());
    app.use('/register', userRegisterRouter)

}

connectionDb.connect((err)=>{
    if(err){
        console.log(err);
    } else {
        run();
    }
})