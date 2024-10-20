import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import { User } from "../models/user-model.js";
const userRegisterRouter = Router();
userRegisterRouter.get('/', async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка получения пользователей" });
    }
});
userRegisterRouter.post('/', UserController.createUser, (req, res) => {
});
export default userRegisterRouter;
