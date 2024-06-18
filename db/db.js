import { sequelize } from "./database.js";

export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const iniciarPerfis = (perfil) => {
  if(perfil !== '') {
    /** fazer */
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
