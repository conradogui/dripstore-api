import db from "../model/index.js";
const Produto = db.produto
const Curtidos = db.curtidos
const Comentarios = db.comentarios
const Carrinho = db.carrinho

export const produtoService = {
  getAll: async (req, res) => {
    const produto = await Produto.findAll();

    return res.status(200).json(produto);
  },
  getById: async (req, res) => {
    const id = req.params.id;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({
        message: `Produto: ${id} não encontrado`,
      });
    }

    return res.status(200).json(produto);
  },

  create: async (req, res) => {
    const produto = req.body;
    const produtoBD = await Produto.create(produto);

    if (!produtoBD) {
      return res.status(500).json({
        message: `Erro ao salvar o produto`,
      });
    }
    return res.status(201).json({
      data: produtoBD,
      message: `Prodduto criado com sucesso`,
    });
  },

  // update: async (req, res) => {
  //   const id = req.params.id
  //   const { nome, preco, descricao } = req.body;
  //   const produto = await Produto.findByPk(id);

  //   if (!produto) {
  //     return res.status(400).json({
  //       message: `Produto id: ${id} nao alterado`,
  //     });
  //   }
  //   produto.nome = nome || produto.nome;
  //   produto.preco = preco || produto.preco;
  //   produto.descricao = descricao || produto.descricao;
  //   await Produto.update({produto});

  //   return res.status(500).json({
  //     message: `Produto id: ${id} alterado com sucesso`,
  //   });

  // },

  update: async (req, res) => {
    const produto = req.body;
    const id = req.params.id;

    if (!produto) {
      return res.status(400).json({
        message: "Porfavor informar objeto da requisição",
      });
    }

    await Produto.update(produto, {
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      message: "produto atualizado com sucesso",
    });
  },

  delete: async (req, res) => {
    const id = req.params.id;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(400).json({
        message: `Produto: ${id} não deletado`,
      });
    }
    await Curtidos.destroy({ where: { produtoId: id } });
    await Carrinho.destroy({ where: { produtoId: id } });
    await Comentarios.destroy({ where: { produtoId: id } });
    await produto.destroy();
    return res.status(200).json({
      message: `Produto deletado com sucesso`,
    });
  },

  getAtivo: async (req, res) => {
    const ativo = req.params.ativo === "true" ? true : false;
    const produtos = await Produto.findAll({
      where: {
        ativo: ativo,
      },
    });

    return res.status(200).json(produtos);
  },
};
