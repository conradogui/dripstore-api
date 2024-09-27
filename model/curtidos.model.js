import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Produto } from "./produto.model.js";

export const Curtidos = sequelize.define(
  "curtidos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuario",  
        key: "id",
      },
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "produtos",  
        key: "id",
      },
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    tableName: "curtidos",
  }
);

Curtidos.belongsTo(Produto, { foreignKey: 'produtoId', onDelete: 'CASCADE' });
Produto.hasMany(Curtidos, { foreignKey: 'produtoId', onDelete: 'CASCADE' });