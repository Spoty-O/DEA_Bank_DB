import { Model, ModelCtor } from "sequelize-typescript";
import DataBaseController from "./db_connect.js";
import { AccountTransaction, AccountTransactionController } from "./models/AccountTransaction.js";
import { BankAccount, BankAccountController } from "./models/BankAccount.js";
import { Client, ClientController } from "./models/Client.js";
import { Department, DepartmentController } from "./models/Departments.js";
import { Replication } from "./models/Replication.js";

async function databaseInitialize() {
  let models: string[] | ModelCtor<Model<any, any>>[] | undefined = [];
  const regex = /\bDepartment\b/;
  if (regex.test(process.env.DB_NAME)) {
    models = [Client, BankAccount, AccountTransaction, Department, Replication];
  } else {
    models = [Department, Replication];
  }
  const DBController = new DataBaseController({
    database: process.env.DB_NAME,
    dialect: "postgres",
    username: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    models, // or [Player, Team],
    pool: {
      idle: 10000,
      acquire: 30000,
    },
  });
  await DBController.connectDB();
  const departments = await DepartmentController.initialize();
  if (regex.test(process.env.DB_NAME)) {
    const clients = await ClientController.initialize(departments);
    const bankAccounts = await BankAccountController.initialize(clients);
    await AccountTransactionController.initialize(bankAccounts);
  }
  await DBController.disconnectDB();
}
databaseInitialize();
