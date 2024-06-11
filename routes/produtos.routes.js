import express from "express";
import { produtoService } from "../services/produtos.service.js";

const routerProduto = express.Router();

routerProduto
  .get("/", produtoService.getAll)
  .get("/:id", produtoService.getById)
  .post("/", produtoService.create)
  .put("/:id", produtoService.update)
  .delete("/:id", produtoService.delete)
  .get("/ativo/:ativo", produtoService.getAtivo);

export default routerProduto;
