import { Request, Response } from 'express';
import Message from '../models/message.js';
import { Op } from 'sequelize';

export default class MessageController {
    static async sendMessage(req: Request, res: Response) {
        try {
            const { senderId, recipientId, adId, content } = req.body;

            if (!senderId || !recipientId || !adId || !content) {
                return res.status(400).json({ message: 'Всі поля є обов\'язковими' });
            }

            const message = await Message.create({
                senderId,
                recipientId,
                adId,
                content,
            });

            res.status(201).json({ message: 'Повідомлення успішно відправлено', data: message });
        } catch (error) {
            console.error('Помилка при відправці повідомлення:', error);
            res.status(500).json({ message: 'Не вдалося відправити повідомлення', error });
        }
    }

    static async getMessages(req: Request, res: Response) {
        try {
            const { userId, chatPartnerId, adId } = req.query;

            if (!userId || !chatPartnerId || !adId) {
                return res.status(400).json({ message: 'userId, chatPartnerId і adId обов\'язкові' });
            }

            const messages = await Message.findAll({
                where: {
                    adId,
                    [Op.or]: [
                        { senderId: userId, recipientId: chatPartnerId },
                        { senderId: chatPartnerId, recipientId: userId },
                    ],
                },
                order: [['createdAt', 'ASC']], 
            });
            

            res.status(200).json({ messages });
        } catch (error) {
            console.error('Помилка при отриманні повідомлень:', error);
            res.status(500).json({ message: 'Не вдалося отримати повідомлення', error });
        }
    }
    static async markAsRead(req: Request, res: Response) {
        try {
            const { messageId } = req.params;

            const message = await Message.findByPk(messageId);

            if (!message) {
                return res.status(404).json({ message: 'Повідомлення не знайдено' });
            }

            message.isRead = true;
            await message.save();

            res.status(200).json({ message: 'Повідомлення позначено як прочитане' });
        } catch (error) {
            console.error('Помилка при оновленні статусу повідомлення:', error);
            res.status(500).json({ message: 'Не вдалося оновити статус повідомлення', error });
        }
    }
}
