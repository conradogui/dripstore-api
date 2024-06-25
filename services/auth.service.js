import pkg from "bcryptjs"
import db from "../model/index.js";
import { Op } from "sequelize";

const {hashSync, compareSync} = pkg

export const authService = {
    signup: async (req, res) => {
        const {nome, email, senha, perfis} = req.body

        const usuario = await db.usuario.create({
            nome,
            email,
            senha: hashSync(senha, 8)
        })

        if(perfis.length > 0) {
            const perfisDB = await db.perfil.findAll({
                where: {
                    nome: {
                        [Op.in]: perfis
                    }
                }
            })

            if(perfisDB) {
                const usuarioPerfil = await usuario.addPerfils(perfisDB)
                    res.status(201).json({
                        msg: `Usuario ${usuario.nome} cadastrado com sucesso`,
                        data: usuarioPerfil
                    })
                
            }
        }
      },
  signin: (req, res) => {},
  logout: (req, res) => {},
};
