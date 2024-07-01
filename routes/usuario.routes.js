import express from "express";
import { userService } from "../services/usuario.service.js";
import { authJwt } from "../middleware/authJwt.js";

const routerUsuario = express.Router();

routerUsuario
  .get("/", [authJwt.verifyToken, authJwt.isAdmin], userService.getAll)
  .get("/:id", userService.getById)
  .post('/', [authJwt.verifyToken, authJwt.isAdmin], userService.create)
  .put("/:id", userService.update)
  .delete("/:id", userService.delete);

export default routerUsuario;
