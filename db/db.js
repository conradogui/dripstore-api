import { sequelize } from "./database.js";

export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("[INFO] DROP e ressincroniza o DB");
  })
  .catch((error) => {
    console.log(`[ERROR] Erro ao sincronizar o db: ${error}`);
  });
