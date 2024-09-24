import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Produto } from "./produto.model.js";
import { User } from "./user.model.js";
import { Perfil } from "./perfil.model.js";

export const Comentario = sequelize.define(
  "comentario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    userType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "perfil",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "comentarios",
  }
);

// Definição das relações
Comentario.belongsTo(User, { foreignKey: "userId" });
Comentario.belongsTo(Produto, { foreignKey: "produtoId" });
Comentario.belongsTo(Perfil, { foreignKey: "userType" });
Produto.hasMany(Comentario, { foreignKey: "produtoId" });
User.hasMany(Comentario, { foreignKey: "userId" });
Perfil.hasMany(Comentario, { foreignKey: 'userType' });
