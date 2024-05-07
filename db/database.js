import { Sequelize } from "sequelize";

import 'dotenv/config'

const HOST = process.env.PGHOST

const DATABASE = process.env.PGDATABASE

const USER = process.env.PGUSER

const PASS = process.env.PGPASSWORD


const STRING_CONNECTION = `postgresql://${USER}:${PASS}@${HOST}/${DATABASE}?sslmode=require`


export const sequelize = new Sequelize(STRING_CONNECTION)
