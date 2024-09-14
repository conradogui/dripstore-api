import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const Produto = sequelize.define(
  "produtos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desconto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_cadastro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    timestamps: true,
    createdAt: "data_cadastro",
    updatedAt: false,
  }
);
