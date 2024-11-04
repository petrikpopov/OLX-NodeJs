import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('OLX', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
export const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение установлено успешно.');
    }
    catch (error) {
        console.error('Не удалось подключиться к базе данных:', error);
    }
};
export const syncDb = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('База данных синхронизирована.');
    }
    catch (error) {
        console.error('Не удалось синхронизировать базу данных:', error);
    }
};
