import db from "../model/index.js";
const Carrinho = db.carrinho;
const Produto = db.produto;

export const carrinhoService = {
    addToCart: async (req, res) => {
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
    
          const existeItem = await Carrinho.findOne({ where: { userId, produtoId: id } });
    
          if (existeItem) {
            existeItem.quantidade += quantidadeNumero;
            await existeItem.save();
          } else {
            await Carrinho.create({ userId, produtoId: id, quantidade: quantidadeNumero });
          }
    
          return res.status(200).json({ message: "Produto adicionado ao carrinho!" });
        } catch (error) {
          console.error(error); 
          return res.status(500).json({ error: "Erro ao adicionar produto ao carrinho!" });
        }
      },

      removeFromCart: async (req, res) => {
        try {
          const cartItemId = req.params.id;
          const userId = req.userId;
      
          console.log(`Tentando remover o item com ID: ${cartItemId}`); 
      
          if (!userId) {
            return res.status(403).json({ message: 'Usuário não autenticado!' });
          }
      
          const cartItem = await Carrinho.findOne({ where: { id: cartItemId, userId } });
      
          if (!cartItem) {
            return res.status(404).json({ message: "Item não encontrado no carrinho" });
          }
      
          await cartItem.destroy();
          return res.status(200).json({ message: "Item removido do carrinho" });
        } catch (error) {
          console.error(error); 
          return res.status(500).json({ error: "Erro ao remover item do carrinho" });
        }
      },
      

  getCartItems: async (req, res) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(403).json({ message: 'Usuário não autenticado!' });
      }

      const cartItems = await Carrinho.findAll({
        where: { userId },
        include: [Produto],
      });

      return res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar itens do carrinho" });
    }
  },
};
