import { Model, ModelCtor } from "sequelize-typescript";
import AccountTransactionController from "./controllers/AccountTransactionController.js";
import BankAccountController from "./controllers/BankAccountController.js";
import ClientController from "./controllers/ClientController.js";
import DepartmentsController from "./controllers/DepartmentController.js";
import DataBaseController from "./db_connect.js";
import { AccountTransaction } from "./models/AccountTransaction.js";
import { BankAccount } from "./models/BankAccount.js";
import { Client } from "./models/Client.js";
import { Department } from "./models/Department.js";
import { Replication } from "./models/Replication.js";

async function databaseInitialize() {
  let models_init: string[] | ModelCtor<Model<any, any>>[] | undefined = [];
  const regex = /Department/;
  if (regex.test(process.env.DB_NAME)) {
    models_init = [Client, BankAccount, AccountTransaction, Department, Replication];
  } else {
    models_init = [Department, Replication];
  }
  console.log(models_init)
  const DBController = new DataBaseController({
    database: process.env.DB_NAME,
    dialect: "postgres",
    username: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    models: models_init, // or [Player, Team],
    pool: {
      idle: 10000,
      acquire: 30000,
    },
  });
  await DBController.connectDB();
  await Department.destroy({cascade: true, truncate: true, restartIdentity: true})
  const departments = await DepartmentsController.initialize();
  if (regex.test(process.env.DB_NAME)) {
    await Client.destroy({cascade: true, truncate: true, restartIdentity: true})
    const clients = await ClientController.initialize(departments);
    const bankAccounts = await BankAccountController.initialize(clients);
    await AccountTransactionController.initialize(bankAccounts);
  }
  await DBController.disconnectDB();
}
databaseInitialize();
