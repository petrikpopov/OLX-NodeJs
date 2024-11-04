import { Router } from 'express';
import { RoleController } from '../controllers/role-controller.js';

const router = Router();

router.post('/', RoleController.createRole);
router.get('/', RoleController.getRoles);

export default router;
