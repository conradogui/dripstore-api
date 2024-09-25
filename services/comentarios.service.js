import db from "../model/index.js";

const Comentario = db.comentarios
const Produto = db.produto
const Usuario = db.usuario

import { authJwt } from "../middleware/authJwt.js";

export const comentarioService = {
    addComment: async (req, res) => {
      try {
        const { produtoId, texto } = req.body;
        const userId = req.userId;
  
        if (!userId) {
          return res.status(403).json({ message: "Usuário não autenticado!" });
        }
  
        const produto = await Produto.findByPk(produtoId);
        if (!produto) {
          return res.status(404).json({ message: "Produto não encontrado" });
        }
  
        const novoComentario = await Comentario.create({
          texto: texto || "",
          userId,
          produtoId,
        });
  
        return res.status(201).json(novoComentario);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao adicionar comentário!" });
      }
    },
  
    getCommentsByProduct: async (req, res) => {
      try {
        const { produtoId } = req.params;
  
        const produto = await Produto.findByPk(produtoId);
        if (!produto) {
          return res.status(404).json({ message: "Produto não encontrado" });
        }
  
        const comentarios = await Comentario.findAll({
          where: { produtoId },
          include: [
            {
              model: Usuario,
              attributes: ["nome"],
            },
          ],
        });
  
        return res.status(200).json(comentarios);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar comentários!" });
      }
    },
  
    removeComment: async (req, res) => {
      try {
        const { id } = req.params;
        const userId = req.userId;
  
      if (!userId) {
        return res.status(403).json({ message: "Usuário não autenticado!" });
      }

      const comentario = await Comentario.findByPk(id);

      if (!comentario) {
        return res.status(404).json({ message: "Comentário não encontrado" });
      }

      const isModerator = await authJwt.isModerator(req);
      if (comentario.userId !== userId && !isModerator) { 
        return res.status(403).json({ message: "Ação não permitida!" });
      }

      await comentario.destroy();
      return res.status(200).json({ message: "Comentário removido com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao remover comentário!" });
    }
  },
};
