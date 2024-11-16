import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/sequelize-config.js';

interface MessageAttributes {
    id: number;
    senderId: number;
    recipientId: number; 
    adId: number; 
    content: string; 
    isRead: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id' | 'isRead'> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
    public id!: number;
    public senderId!: number;
    public recipientId!: number;
    public adId!: number;
    public content!: string;
    public isRead!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recipientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        adId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'Message',
        tableName: 'messages',
    }
);

export default Message;
