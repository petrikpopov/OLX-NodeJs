import { Router , Response, Request} from "express";
import { IUsers, users } from "../data/user.js";
import { UserController } from "../controllers/user-controller.js";
import { User } from "../models/user-model.js";

const userRegisterRouter = Router();

userRegisterRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка получения пользователей" });
    }
});

userRegisterRouter.post('/', UserController.createUser, (req:Request<{},{},IUsers>, res:Response)=>{

});

export default userRegisterRouter;