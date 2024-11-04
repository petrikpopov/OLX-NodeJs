import { Router } from 'express';
import { AdController } from '../controllers/ad-controller.js';

const router = Router();

router.post('/', AdController.createAd);
router.get('/', AdController.getAds);
router.get('/:id', AdController.getAdById);
router.put('/update/:id', AdController.updateAd);
router.delete('/delete/:id', AdController.deleteAd);

export default router;
