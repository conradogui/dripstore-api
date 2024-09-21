import db from "../model/index.js";
const Curtidos = db.curtidos;
const Produto = db.produto;

export const curtidosService = {
    addLiked: async (req, res) => {
        try {
          const { id, quantidade } = req.body;
          const userId = req.userId;
    
          if (!userId) {
            return res.status(403).json({ message: 'Usuário não autenticado!' });
          }
    
          if (isNaN(quantidade) || quantidade <= 0) {
            return res.status(400).json({ message: 'Quantidade inválida!' });
          }
    
          const quantidadeNumero = Number(quantidade);
    
          const produto = await Produto.findByPk(id);
          if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado" });
          }
    
          const existeItem = await Curtidos.findOne({ where: { userId, produtoId: id } });
    
          if (existeItem) {
            existeItem.quantidade += quantidadeNumero;
            await existeItem.save();
          } else {
            await Curtidos.create({ userId, produtoId: id, quantidade: quantidadeNumero });
          }
    
          return res.status(200).json({ message: "Produto adicionado aos curtidos!" });
        } catch (error) {
          console.error(error); 
          return res.status(500).json({ error: "Erro ao adicionar produto aos curtidos!" });
        }
      },

      removeFromLiked: async (req, res) => {
        try {
          const likedItemsId = req.params.id;
          const userId = req.userId;
      
          console.log(`Tentando remover o item com ID: ${likedItemsId}`); 
      
          if (!userId) {
            return res.status(403).json({ message: 'Usuário não autenticado!' });
          }
      
          const likedItems = await Curtidos.findOne({ where: { id: likedItemsId, userId } });
      
          if (!likedItems) {
            return res.status(404).json({ message: "Item não encontrado nos curtidos" });
          }
      
          await likedItems.destroy();
          return res.status(200).json({ message: "Item removido dos curtidos" });
        } catch (error) {
          console.error(error); 
          return res.status(500).json({ error: "Erro ao remover item dos curtidos" });
        }
      },
      

  getLikedItems: async (req, res) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(403).json({ message: 'Usuário não autenticado!' });
      }

      const likedItems = await Curtidos.findAll({
        where: { userId },
        include: [Produto],
      });

      return res.status(200).json(likedItems);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar itens nos curtidos" });
    }
  },
};
