import { Sequelize } from "sequelize"
import { sequelize } from "../db/database.js"
import { Produto } from "./produto.model.js"
import {User} from "./user.model.js"



const db = {}

db.produto = Produto
db.usuario = User


export default db

