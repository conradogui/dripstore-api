import express from "express";
import { comentarioService } from "../services/comentarios.service.js";
import { authJwt } from "../middleware/authJwt.js";

const routerComentarios = express.Router()

routerComentarios
    .get("/produtos/:produtoId/comentarios", comentarioService.getCommentsByProduct)
    .post("/produtos/:produtoId/comentarios", [authJwt.verifyToken], comentarioService.addComment)
    .delete("/produtos/:produtoId/comentarios/:id",[authJwt.verifyToken], comentarioService.removeComment )

export default routerComentarios