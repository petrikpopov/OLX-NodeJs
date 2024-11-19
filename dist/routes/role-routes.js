import { Router } from 'express';
import { RoleController } from '../controllers/role-controller.js';
const router = Router();
router.post('/', RoleController.createRole);
router.get('/', RoleController.getRoles);
router.get('/:id', RoleController.getRoleById);
router.put('/update/:id', RoleController.updateRole);
router.delete('/delete/:id', RoleController.deleteRole);
export default router;
