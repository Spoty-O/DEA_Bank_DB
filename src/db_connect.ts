import { Sequelize } from "sequelize-typescript";
import { BankAccount } from "./models/BankAccount.js";
import { Client } from "./models/Client.js";
import { AccountTransaction } from "./models/AccountTransaction.js";
import { Department } from "./models/Departments.js";

const sequelize = new Sequelize({
  database: "DEA_BANK",
  dialect: "postgres",
  username: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  models: [BankAccount, Client, AccountTransaction, Department], // or [Player, Team],
});

async function connectDB(): Promise<void> {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    await sequelize.close();
    console.error("Unable to connect to the database:", error);
  }
}

async function disconnectDB(): Promise<void> {
  try {
    await sequelize.close();
    console.log("✅ Connection has been closed successfully.");
  } catch (error) {
    console.error("Unable to close the database connection:", error);
    throw error; // Пробрасываем ошибку для обработки во внешнем коде
  }
}
export { connectDB, disconnectDB };
