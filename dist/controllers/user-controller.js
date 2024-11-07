import { User } from '../models/user-model.js';
import { Role } from '../models/role-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export class UserController {
    static async createUser(req, res) {
        try {
            const { login, email, password, roleId } = req.body;
            if (!login || !email || !password || !roleId) {
                return res.status(400).json({ message: 'Заполните все обязательные поля' });
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await User.create({ login, email, password: hashedPassword, roleId });
            res.status(201).json(user);
        }
        catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            res.status(500).json({ message: 'Не удалось создать пользователя', error });
        }
    }
    static async getUsers(req, res) {
        try {
            const users = await User.findAll({
                include: [{
                        model: Role,
                        as: 'Role',
                        attributes: ['id', 'name']
                    }]
            });
            res.status(200).json(users);
        }
        catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            res.status(500).json({ message: 'Не удалось получить пользователей', error });
        }
    }
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                include: [{
                        model: Role,
                        as: 'Role',
                        attributes: ['id', 'name']
                    }]
            });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            res.status(200).json(user);
        }
        catch (error) {
            console.error('Ошибка при получении пользователя:', error);
            res.status(500).json({ message: 'Не удалось получить пользователя', error });
        }
    }
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { login, email, password, roleId } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            await user.update({ login, email, password, roleId });
            res.status(200).json(user);
        }
        catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            res.status(500).json({ message: 'Не удалось обновить пользователя', error });
        }
    }
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            await user.destroy();
            res.status(204).send();
        }
        catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            res.status(500).json({ message: 'Не удалось удалить пользователя', error });
        }
    }
    static async login(req, res) {
        try {
            const { login, password } = req.body;
            const user = await User.findOne({ where: { login } });
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }
            const token = jwt.sign({ id: user.id, login: user.login, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Авторизация успешна', token });
        }
        catch (error) {
            console.error('Ошибка при авторизации:', error);
            res.status(500).json({ message: 'Не удалось авторизовать пользователя', error });
        }
    }
}
