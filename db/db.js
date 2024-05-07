import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgresql://dripsore_db_owner:7D8LiVuTBAzl@ep-rapid-bread-a5yj6bor.us-east-2.aws.neon.tech/dripsore_db?sslmode=require')

export const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

}