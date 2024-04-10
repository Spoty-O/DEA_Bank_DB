import { connectDB, disconnectDB } from "./db_connect.js";
import { AccountTransaction } from "./models/AccountTransaction.js";
import { BankAccount } from "./models/BankAccount.js";
import { Client } from "./models/Client.js";
import { Department } from "./models/Departments.js";

const names = ["John", "Jane", "Michael", "Emily", "William", "Jessica", "David", "Sarah", "Daniel", "Olivia"];
const lastNames = ["Doe", "Smith", "Williams", "Brown", "Taylor", "Wilson", "Johnson", "Miller", "Jones", "Davis"];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}

// Функция для генерации случайной комбинации имени и фамилии
function getRandomName(): string {
  const randomNameIndex = getRandomInt(0, names.length - 1);

  const randomFirstName = names[randomNameIndex];

  return randomFirstName;
}

function getRandomLastName(): string {
  const randomLastNameIndex = getRandomInt(0, lastNames.length - 1);

  const randomLastName = lastNames[randomLastNameIndex];

  return randomLastName;
}

async function databaseInitialize() {
  await connectDB();
  await Department.truncate({ cascade: true });
  await Department.bulkCreate([
    { address: "123 Main St", city: "New York", phone: "123-456-7890" },
    { address: "456 Elm St", city: "New York", phone: "456-789-0123" },
  ]).then((departments: Department[]) => {
    // Создаем записи для каждого департамента
    departments.forEach((department) => {
      // Создаем клиентов для данного департамента
      Client.bulkCreate([
        {
          firstName: getRandomName(),
          lastName: getRandomLastName(),
          phone: "123-456-7890",
          departmentId: department.id,
        },
        {
          firstName: getRandomName(),
          lastName: getRandomLastName(),
          phone: "456-789-0123",
          departmentId: department.id,
        },
        {
          firstName: getRandomName(),
          lastName: getRandomLastName(),
          phone: "789-012-3456",
          departmentId: department.id,
        },
        {
          firstName: getRandomName(),
          lastName: getRandomLastName(),
          phone: "234-567-8901",
          departmentId: department.id,
        },
        {
          firstName: getRandomName(),
          lastName: getRandomLastName(),
          phone: "567-890-1234",
          departmentId: department.id,
        },
        // Здесь можно добавить еще клиентов
      ]).then((clients: Client[]) => {
        // Создаем банковские счета для каждого клиента
        clients.forEach((client) => {
          BankAccount.create({ balance: 1000, clientId: client.id, departmentIdWhereOpen: department.id }).then(
            (bankAccount: BankAccount) => {
              // Создаем транзакции для каждого банковского счета
              AccountTransaction.bulkCreate([
                {
                  amount: 500,
                  date: new Date(),
                  transactionType: "Перевод",
                  bankAccountId: bankAccount.id,
                  recipientBankAccountId: bankAccount.id,
                },
              ]);
            },
          );
        });
      });
    });
  });
  await disconnectDB();
}
databaseInitialize();
