import express from "express";
import { carrinhoService } from "../services/carrinho.service.js";
import { authJwt } from "../middleware/authJwt.js";

const routerCarrinho = express.Router();

routerCarrinho
  .get("/", [authJwt.verifyToken], carrinhoService.getCartItems)
  .post("/", [authJwt.verifyToken], carrinhoService.addToCart)
  .delete("/:id", [authJwt.verifyToken], carrinhoService.removeFromCart);

export default routerCarrinho;
