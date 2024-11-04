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
}
