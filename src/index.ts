import express, { Express, Request, Response } from "express";
import { Sequelize } from "sequelize-typescript";
import errorHandler from "./middleware/ErrorHandler.js";
import { BankAccount } from "./models/BankAccount.js";
import { Client } from "./models/Client.js";
import { AccountTransaction } from "./models/AccountTransaction.js";
import { Department } from "./models/Departments.js";

const app: Express = express();
const PORT = 5000;
const HOST = "localhost";

app.use(errorHandler);

const sequelize = new Sequelize({
  database: "DEA_BANK",
  dialect: "postgres",
  username: "postgres",
  password: "1234",
  host: HOST,
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

app.get("/", async (req: Request, res: Response) => {
  const clients = await Client.findAll()
  console.log(clients)
  res.send(clients);
});

const start = async () => {
  try {
    await connectDB();
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

start();
