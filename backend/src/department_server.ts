import express, { Express } from "express";
import nodemon from "nodemon";
import cors from "cors";
import DataBaseController from "./controllers/DataBaseController.js";
import { AccountTransaction } from "./models/AccountTransaction.js";
import { BankAccount } from "./models/BankAccount.js";
import { Client } from "./models/Client.js";
import departmentServerRoutes from "./routes/DepartmentServerRoutes.js";
import errorHandler from "./middleware/ErrorHandler.js";
import dotenv from "dotenv";
dotenv.config();

const example_run = "Введите все необходимые параметры, пример запуска:\nnpm run dev_department <PORT> <DataBase Name> <APIKey>"

if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
  console.log(example_run)
  process.exit(1)
}

const app: Express = express();
const PORT = process.argv[2];
const HOST = "localhost";

const DBController = new DataBaseController(
  process.argv[3],
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_HOST,
  [Client, BankAccount, AccountTransaction],
);

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("asd");
});
app.use("/api", departmentServerRoutes);
app.use(errorHandler);

const start = async () => {
  try {
    await DBController.connectDB();
    app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

async function gracefulShutdown() {
  console.log("Shutting down gracefully...");
  try {
    await DBController.disconnectDB();
    process.exit(0); // Выходим с кодом успешного завершения
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    process.exit(1); // Выходим с ненулевым кодом в случае ошибки
  }
}

process.on("SIGINT", gracefulShutdown);

nodemon("").on("restart", gracefulShutdown);

start();
