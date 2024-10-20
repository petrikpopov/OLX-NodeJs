import { Response, Request, NextFunction } from "express";
import { User } from "../models/user-model.js";
import { IUserCreate } from "../data/user.js";

export class UserController {
    static createUser(req:Request<{}, {}, IUserCreate>, res:Response, nex:NextFunction){
        try {
            const id = User.addRegisterUser(req.body).then(data=>{
                res.status(201).json({
                    id:data,
                    login:req.body.login,
                    email:req.body.email,
                    password:req.body.password
                });
                return;
            })
        }
        catch (err){
            console.log(err);
            res.status(201).send();
            return;
        }
    }
}