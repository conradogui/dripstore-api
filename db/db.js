import db from "../model/index.js";
import { sequelize } from "./database.js";

export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const iniciarPerfis = async () => {
  const perfis = await db.perfil.findAll();

  if (perfis.length === 0) {
    db.perfil.create({
      id: 1,
      nome: "usuario",
      codigo: 'USER'
    });

    db.perfil.create({
      id: 2,
      nome: "moderador",
      codigo: 'MOD'
    });

    db.perfil.create({
      id: 3,
      nome: "admin",
      codigo: 'ADMIN'
    });
  }

}

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("[INFO] DROP e ressincroniza o DB");
    iniciarPerfis()
  })
  .catch((error) => {
    console.log(`[ERROR] Erro ao sincronizar o db: ${error}`);
  });
