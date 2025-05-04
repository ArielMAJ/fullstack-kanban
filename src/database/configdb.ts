import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env["POSTGRES_DB"]!,
  process.env["POSTGRES_DB_USER"]!,
  process.env["POSTGRES_DB_PASSWORD"]!,
  {
    host: process.env["POSTGRES_DB_HOST"] || "localhost",
    dialect: "postgres",
  }
);

export async function connect() {
  console.log("Conectando-se à base de dados...");
  try {
    await sequelize.authenticate();
    console.log("Conexão com a base de dados estabelecida com sucesso.");
    await sequelize.sync();
  } catch (e) {
    console.error("Erro ao se conectar à base de dados:", e);
  }
}

export default sequelize;
