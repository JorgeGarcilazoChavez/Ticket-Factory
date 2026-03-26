import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";

export const Ticket = sequelize.define(
    'Ticket',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        price: { type: DataTypes.DECIMAL(10,2), allowNull:false },
        seat: { type:DataTypes.STRING, allowNull:false},
        access: { type:DataTypes.STRING, allowNull:false},
        zone: { type:DataTypes.STRING, allowNull:false},
        section: { type:DataTypes.STRING, allowNull:false},
        concertId:{ type: DataTypes.INTEGER, allowNull:false},
        userId:{ type: DataTypes.INTEGER},
    }
);