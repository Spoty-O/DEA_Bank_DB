import express, { Express, Request, Response } from "express";
import {connectDB, disconnectDB} from "./db_connect.js";
import errorHandler from "./middleware/ErrorHandler.js";
import { Client } from "./models/Client.js";

const app: Express = express();
const PORT = 5000;
const HOST = "localhost";

app.use(errorHandler);

app.get("/", async (req: Request, res: Response) => {
  const clients = await Client.findAll({});
  console.log(clients);
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

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  try {
    await disconnectDB();
    process.exit(0); // Выходим с кодом успешного завершения
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    process.exit(1); // Выходим с ненулевым кодом в случае ошибки
  }
});

start();
