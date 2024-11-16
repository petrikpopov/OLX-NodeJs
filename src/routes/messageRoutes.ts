import express from 'express';
import MessageController from '../controllers/messageController.js';

const router = express.Router();

router.post('/send', MessageController.sendMessage);
router.get('/get', MessageController.getMessages);
router.patch('/read/:messageId', MessageController.markAsRead);

export default router;
