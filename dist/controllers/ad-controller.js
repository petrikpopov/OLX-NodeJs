import { Ad } from '../models/ad-model.js';
import { Op } from 'sequelize';
export class AdController {
    static async createAd(req, res) {
        try {
            const { title, description, category, price, photos } = req.body;
            if (!title || !description || !category || !price) {
                return res.status(400).json({ message: 'Заполните все обязательные поля' });
            }
            const ad = await Ad.create({ title, description, category, price, photos });
            res.status(201).json(ad);
        }
        catch (error) {
            console.error('Ошибка при создании объявления:', error);
            res.status(500).json({ message: 'Не удалось создать объявление', error });
        }
    }
    static async getAds(req, res) {
        try {
            const ads = await Ad.findAll();
            res.status(200).json(ads);
        }
        catch (error) {
            console.error('Ошибка при получении объявлений:', error);
            res.status(500).json({ message: 'Не удалось получить объявления', error });
        }
    }
    static async getAdById(req, res) {
        try {
            const { id } = req.params;
            const ad = await Ad.findByPk(id);
            if (!ad) {
                return res.status(404).json({ message: 'Объявление не найдено' });
            }
            res.status(200).json(ad);
        }
        catch (error) {
            console.error('Ошибка при получении объявления:', error);
            res.status(500).json({ message: 'Не удалось получить объявление', error });
        }
    }
    static async updateAd(req, res) {
        try {
            const { id } = req.params;
            const { title, description, category, price, photos } = req.body;
            const ad = await Ad.findByPk(id);
            if (!ad) {
                return res.status(404).json({ message: 'Объявление не найдено' });
            }
            await ad.update({ title, description, category, price, photos });
            res.status(200).json(ad);
        }
        catch (error) {
            console.error('Ошибка при обновлении объявления:', error);
            res.status(500).json({ message: 'Не удалось обновить объявление', error });
        }
    }
    static async deleteAd(req, res) {
        try {
            const { id } = req.params;
            const ad = await Ad.findByPk(id);
            if (!ad) {
                return res.status(404).json({ message: 'Объявление не найдено' });
            }
            await ad.destroy();
            res.status(204).send();
        }
        catch (error) {
            console.error('Ошибка при удалении объявления:', error);
            res.status(500).json({ message: 'Не удалось удалить объявление', error });
        }
    }
    static async searchAds(req, res) {
        try {
            const { title, category, minPrice, maxPrice } = req.query;
            const whereConditions = [];
            if (title) {
                whereConditions.push({ title: { [Op.like]: `%${title}%` } });
            }
            if (category) {
                whereConditions.push({ category: { [Op.like]: `%${category}%` } });
            }
            if (minPrice) {
                whereConditions.push({ price: { [Op.gte]: Number(minPrice) } });
            }
            if (maxPrice) {
                whereConditions.push({ price: { [Op.lte]: Number(maxPrice) } });
            }
            const ads = await Ad.findAll({
                where: {
                    [Op.and]: whereConditions
                },
            });
            if (ads.length === 0) {
                return res.status(404).json({ message: 'Объявления не найдены' });
            }
            res.status(200).json(ads);
        }
        catch (error) {
            console.error('Ошибка при поиске объявлений:', error);
            res.status(500).json({ message: 'Не удалось выполнить поиск объявлений', error });
        }
    }
}
