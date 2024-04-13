import express, { Express } from "express";
import nodemon from "nodemon";
import DataBaseController from "./controllers/DataBaseController.js";
import errorHandler from "./middleware/ErrorHandler.js";
import { Department } from "./models/Department.js";
import { Replication } from "./models/Replication.js";
import mainServerRoutes from "./routes/MainServerRoutes.js";
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
  [Department, Replication],
);

app.use("/api", mainServerRoutes);
app.use(errorHandler);

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
