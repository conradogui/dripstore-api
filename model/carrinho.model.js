import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Produto } from "./produto.model.js";

export const Carrinho = sequelize.define(
  "carrinho",
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
    tableName: "carrinho",
  }
);

Carrinho.belongsTo(Produto, { foreignKey: 'produtoId' });
Produto.hasMany(Carrinho, { foreignKey: 'produtoId' });
