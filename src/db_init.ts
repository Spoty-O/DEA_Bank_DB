import { ModelCtor } from "sequelize-typescript";
// import AccountTransactionController from "./controllers/AccountTransactionController.js";
// import BankAccountController from "./controllers/BankAccountController.js";
// import ClientController from "./controllers/ClientController.js";
// import DepartmentsController from "./controllers/DepartmentController.js";
import DataBaseController from "./controllers/DataBaseController.js";
import { AccountTransaction } from "./models/AccountTransaction.js";
import { BankAccount } from "./models/BankAccount.js";
import { Client } from "./models/Client.js";
import { Department } from "./models/Department.js";
import { Replication } from "./models/Replication.js";
import dotenv from "dotenv";
dotenv.config();

async function databaseInitialize() {
  if (!process.argv[2]) {
    return;
  }
  let models_init: string[] | ModelCtor[] | undefined = [];
  const regex = /Department/;
  if (regex.test(process.argv[2])) {
    models_init = [Client, BankAccount, AccountTransaction];
  } else {
    models_init = [Department, Replication];
  }
  console.log(models_init);
  const DBController = new DataBaseController(
    process.env.npm_config_DBname,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_HOST,
    models_init,
  );
  try {
    await DBController.connectDB();
    await DBController.sequelize.sync({ force: true });
    // if (regex.test(process.argv[2])) {
    //   const clients = await ClientController.initialize();
    //   const bankAccounts = await BankAccountController.initialize(clients);
    //   await AccountTransactionController.initialize(bankAccounts);
    // } else {
    //   await DepartmentsController.initialize();
    // }
    await DBController.disconnectDB();
  } catch (error) {
    console.log(error);
    await DBController.disconnectDB();
  }
}
databaseInitialize();
