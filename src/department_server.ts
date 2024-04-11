import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from "express";
import nodemon from "nodemon";
import DataBaseController from "./db_connect.js";
import errorHandler from "./middleware/ErrorHandler.js";
import { Department } from "./models/Department.js";
import { Replication } from "./models/Replication.js";
import mainServerRoutes from "./routes/MainServerRoutes.js";

const app: Express = express();
const PORT = 5000;
const HOST = "localhost";

const DBController = new DataBaseController({
  database: process.env.DB_NAME,
  dialect: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  models: [Department, Replication], // or [Player, Team],
  pool: {
    idle: 10000,
    acquire: 30000,
  },
});

app.use("/api", mainServerRoutes);
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