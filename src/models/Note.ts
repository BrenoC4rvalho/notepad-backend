import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/pg";

export interface NoteInstance extends Model {
    id: number;
    title: string;
    note: string;
    user_id: number
}

export const Note = sequelize.define<NoteInstance>('Note', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
    },
    note: {
        type: DataTypes.STRING,   
    },
    user_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'notes',
    timestamps: false
});