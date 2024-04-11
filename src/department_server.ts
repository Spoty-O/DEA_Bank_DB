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

const app: Express = express();
const PORT = 5000;
const HOST = "localhost";

const DBController = new DataBaseController(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_HOST,
  [Client, BankAccount, AccountTransaction]);

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
    app.listen(PORT, () =>
      console.log(
        `${process.env.DB_NAME} list on http://${HOST}:${PORT}`,
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

nodemon("").on("restart", async () => {
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
