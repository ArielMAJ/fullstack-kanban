import pg from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env["DATABASE_URL"]!,
  {
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions:
      (process.env["POSTGRES_DB_HOST"] || "localhost") === "localhost"
        ? {}
        : {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          },
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
