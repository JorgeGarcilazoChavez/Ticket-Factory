import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";

export const Concert = sequelize.define(
    'Concert',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: { type: DataTypes.STRING, allowNull: false},
        venue: { type: DataTypes.STRING, allowNull: false},
        artist: { type: DataTypes.STRING, allowNull: false},
        image: {type: DataTypes.STRING, allowNull: false},
        date: { type: DataTypes.DATE, allowNull: false},
        genre: {type: DataTypes.STRING, allowNull: false}
    }
);