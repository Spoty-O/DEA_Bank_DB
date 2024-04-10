import express, { Express, Request, Response } from "express";
import DataBaseController from "./db_connect.js";
import errorHandler from "./middleware/ErrorHandler.js";
import { AccountTransaction } from "./models/AccountTransaction.js";
import { BankAccount } from "./models/BankAccount.js";
import { Client } from "./models/Client.js";
import { Department } from "./models/Departments.js";

const app: Express = express();
const PORT = 5000;
const HOST = "localhost";

const DBController = new DataBaseController({
  database: "DEA_BANK",
  dialect: "postgres",
  username: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  models: [BankAccount, Client, AccountTransaction, Department], // or [Player, Team],
  pool: {
    idle: 10000,
    acquire: 30000,
  },
});

app.use(errorHandler);

app.get("/", async (req: Request, res: Response) => {
  const clients = await Client.findAll({});
  console.log(clients);
  res.send(clients);
});

const start = async () => {
  try {
    await DBController.connectDB();
    app.listen(PORT, () =>
      console.log(
        `http://${HOST}:${PORT}`,
        // `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`,
      ),
    );
  } catch (e) {
    console.log(e);
  }
};

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  try {
    await DBController.disconnectDB();
    process.exit(0); // Выходим с кодом успешного завершения
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    process.exit(1); // Выходим с ненулевым кодом в случае ошибки
  }
});

start();
