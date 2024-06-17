import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const User = sequelize.define(
  "usuarios",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_cadastro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    data_atualizacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    timestamps: true,
    createdAt: "data_cadastro",
    updatedAt: false,
    tableName: 'usuario'
  }
);
