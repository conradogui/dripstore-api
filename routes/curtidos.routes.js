import express from "express";
import { curtidosService } from "../services/curtidos.service.js";
import { authJwt } from "../middleware/authJwt.js";

const routerCurtidos = express.Router();

routerCurtidos
  .get("/", [authJwt.verifyToken], curtidosService.getLikedItems)
  .post("/", [authJwt.verifyToken], curtidosService.addLiked)
  .delete("/:id", [authJwt.verifyToken], curtidosService.removeFromLiked);

export default routerCurtidos;