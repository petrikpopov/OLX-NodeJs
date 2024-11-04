import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/sequelize-config.js';
import { Role } from './role-model.js';

interface UserAttributes {
    id: number;
    login: string;
    email: string;
    password: string;
    roleId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public login!: string;
    public email!: string;
    public password!: string;
    public roleId!: number;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'roles',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });
