import { Role } from '../models/role-model.js';
export class RoleController {
    static async createRole(req, res) {
        try {
            const role = await Role.create(req.body);
            res.status(201).json(role);
        }
        catch (error) {
            res.status(500).json({ message: 'Не удалось создать роль', error });
        }
    }
    static async getRoles(req, res) {
        try {
            const roles = await Role.findAll();
            res.status(200).json(roles);
        }
        catch (error) {
            res.status(500).json({ message: 'Не удалось получить роли', error });
        }
    }
    static async getRoleById(req, res) {
        try {
            const { id } = req.params;
            const role = await Role.findByPk(id);
            if (!role) {
                return res.status(404).json({ message: 'Роль не найдена' });
            }
            res.status(200).json(role);
        }
        catch (error) {
            res.status(500).json({ message: 'Не удалось получить роль', error });
        }
    }
    static async updateRole(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const role = await Role.findByPk(id);
            if (!role) {
                return res.status(404).json({ message: 'Роль не найдена' });
            }
            await role.update({ name, description });
            res.status(200).json(role);
        }
        catch (error) {
            res.status(500).json({ message: 'Не удалось обновить роль', error });
        }
    }
    static async deleteRole(req, res) {
        try {
            const { id } = req.params;
            const role = await Role.findByPk(id);
            if (!role) {
                return res.status(404).json({ message: 'Роль не найдена' });
            }
            await role.destroy();
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: 'Не удалось удалить роль', error });
        }
    }
}
