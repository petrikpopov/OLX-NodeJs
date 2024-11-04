import { Request, Response } from 'express';
import { User } from '../models/user-model.js';
import { Role } from '../models/role-model.js';

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const { login, email, password, roleId } = req.body;
            if (!login || !email || !password || !roleId) {
                return res.status(400).json({ message: 'Заполните все обязательные поля' });
            }
            const user = await User.create({ login, email, password, roleId });
            res.status(201).json(user);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            res.status(500).json({ message: 'Не удалось создать пользователя', error });
        }
    }
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await User.findAll({
                include: [{
                    model: Role, 
                    as: 'Role',  
                    attributes: ['id', 'name']
                }]
            });
            res.status(200).json(users);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            res.status(500).json({ message: 'Не удалось получить пользователей', error });
        }
    }
}
