import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Produto } from "./produto.model.js";
import { User } from "./user.model.js";

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
  },
  {
    timestamps: true,
    tableName: "comentarios",
  }
);

Comentario.belongsTo(User, { foreignKey: "userId" });
Comentario.belongsTo(Produto, { foreignKey: "produtoId", onDelete: 'CASCADE' });
Produto.hasMany(Comentario, { foreignKey: "produtoId", onDelete: 'CASCADE' });
User.hasMany(Comentario, { foreignKey: "userId" });
