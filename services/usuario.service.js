import db from "../model/index.js";
const User = db.usuario

export const userService = {
    getAll: async (req, res) => {
      const usuario = await User.findAll();
  
      return res.status(200).json(usuario);
    },
    getById: async (req, res) => {
      const id = req.params.id;
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({
          message: `Usuario: ${id} não encontrado`,
        });
      }
  
      return res.status(200).json(user);
    },
  
    create: async (req, res) => {
      const usuario = req.body;
      const userBD = await User.create(usuario);
  
      if (!userBD) {
        return res.status(500).json({
          message: `Erro ao salvar o usuario`,
        });
      }
      return res.status(201).json({
        data: userBD,
        message: `Usuario criado com sucesso`,
      });
    },
  
    update: async (req, res) => {
      const user = req.body;
      const id = req.params.id;
  
      if (!user) {
        return res.status(400).json({
          message: "Por favor informar usuario da requisição",
        });
      }
  
      await User.update(user, {
        where: {
          id: id,
        },
      });
  
      return res.status(200).json({
        message: "usuario atualizado com sucesso",
      });
    },
  
    delete: async (req, res) => {
      const id = req.params.id;
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(400).json({
          message: `Usuario: ${id} não deletado`,
        });
      }
      await user.destroy();
      return res.status(500).json({
        message: `Usuario deletado com sucesso`,
      });
    },
  };