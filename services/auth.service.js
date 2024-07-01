import pkg from "bcryptjs";
import db from "../model/index.js";
import { Op } from "sequelize";
import jwt from 'jsonwebtoken'
import { secret } from "../config/auth.config.js";
const Usuario = db.usuario
const Perfil = db.perfil

const { hashSync, compareSync } = pkg;

export const authService = {
  signup: async (req, res) => {
    const { nome, email, senha, perfis } = req.body;

    const usuario = await Usuario.create({
      nome,
      email,
      senha: hashSync(senha, 8),
    });

    if (perfis && perfis.length > 0) {
      const perfisDB = await Perfil.findAll({
        where: {
          nome: {
            [Op.in]: perfis,
          },
        },
      });

      if (perfisDB) {
        const usuarioPerfil = await usuario.addPerfils(perfisDB);
        res.status(201).json({
          msg: `Usuario ${usuario.nome} cadastrado com sucesso`,
          data: usuarioPerfil,
        });
      }
    } else {
      const usuarioPerfil = await usuario.addPerfils([1]);
      res.status(201).json({
        msg: `Usuario ${usuario.nome} cadastrado com sucesso`,
        data: usuarioPerfil,
      });
    }
  },
  signin: async (req, res) => {
    const { email, senha, perfis } = req.body;

    const usuarioDB = await Usuario.findOne({
      where: {
        email,
      },
    });

    try {
      if (!usuarioDB) {
          return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = compareSync(
          req.body.senha,
          usuarioDB.senha
      );

      if (!passwordIsValid) {
          return res.status(401).send({
              token: null,
              message: "Invalid Password!"
          });
      }
      console.log(secret)

      const token = jwt.sign({ id: usuarioDB.id },
          secret,
          {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
          });

      var authorities = [];
      usuarioDB.getPerfils().then(perfis => {
          for (let i = 0; i < perfis.length; i++) {
              authorities.push("PERFIL_" + perfis[i].nome.toUpperCase());
          }
          res.status(200).send({
              id: usuarioDB.id,
              nome: usuarioDB.nome,
              email: usuarioDB.email,
              perfis: authorities,
              token
          });
      });
  } catch (error) {
      console.log(`error`, error);
      res.status(500).send({ message: error.message });
  }
},
  logout: (req, res) => {},
};
