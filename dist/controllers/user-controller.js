import { User } from "../models/user-model.js";
export class UserController {
    static createUser(req, res, nex) {
        try {
            const id = User.addRegisterUser(req.body).then(data => {
                res.status(201).json({
                    id: data,
                    login: req.body.login,
                    email: req.body.email,
                    password: req.body.password
                });
                return;
            });
        }
        catch (err) {
            console.log(err);
            res.status(201).send();
            return;
        }
    }
}
