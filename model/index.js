import { Sequelize } from "sequelize"
import { sequelize } from "../db/database.js"
import { Produto } from "./produto.model.js"
import {Carrinho} from "./carrinho.model.js"
import {User} from "./user.model.js"
import { Perfil } from "./perfil.model.js"
import { Curtidos } from "./curtidos.model.js"
import { Comentario } from "./comentarios.model.js"



const db = {} 

db.produto = Produto
db.carrinho = Carrinho
db.curtidos = Curtidos
db.comentarios = Comentario
db.usuario = User
db.perfil = Perfil

db.perfil.belongsToMany(db.usuario, {
    through: "usuario_perfil"
  });
  db.usuario.belongsToMany(db.perfil, {
    through: "usuario_perfil"
  });

  db.PERFIS = ["usuario", "admin", "moderador"];

export default db

