import express from 'express';
import https from 'https';
import fs from 'node:fs';
import path from 'node:path';
import userRouter from './routes/user-rotes.js';
import roleRouter from './routes/role-routes.js';
import { connectDb } from './config/sequelize-config.js';
const PORT = 3443;
const _dirname = import.meta.url ? path.dirname(new URL(import.meta.url).pathname) : '';
const run = () => {
    const app = express();
    const options = {
        key: fs.readFileSync(path.join(_dirname, "..", "cert", "key.pem")),
        cert: fs.readFileSync(path.join(_dirname, "..", "cert", "cert.pem"))
    };
    https.createServer(options, app).listen(PORT, () => console.log(`Сервер запущен https://127.0.0.1:${PORT}`));
    app.use(express.json());
    app.use('/users', userRouter);
    app.use('/roles', roleRouter);
};
connectDb().then(run).catch(err => console.error('Не удалось подключиться к базе данных:', err));
