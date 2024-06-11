import express from "express";
import { userService } from "../services/usuario.service.js";

const routerUsuario = express.Router();

routerUsuario
  .get("/", userService.getAll)
  .get("/:id", userService.getById)
  .post("/", userService.create)
  .put("/:id", userService.update)
  .delete("/:id", userService.delete);

export default routerUsuario;
