import express from "express";
import { authService } from "../services/auth.service.js";

const routerAuth = express.Router();

routerAuth
  .post("/signup", authService.signup)
  .post("/signin", authService.signin)
  .post("/logout", authService.logout);

export default routerAuth;
