import { Optional } from "sequelize";
import ApiError from "../helpers/ApiErrors.ts";

interface DepartmentAttributes {
  id: number;
  address: string;
  city: string;
  phone: string;
  domain: string;
}

interface ReplicationAttributes {
  id: number;
  clientId: string; // hash id
  firstName: string;
  lastName: string;
  departmentId: number;
}

interface ClientAttributes {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  replicated: boolean;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, "replicated" | "id"> {}

interface BankAccountAttributes {
  id: string;
  balance: number;
  clientId: string;
  replicated: boolean;
}

interface BankAccountCreationAttributes extends Optional<BankAccountAttributes, "replicated" | "id"> {}

interface AccountTransactionAttributes {
  id: string;
  amount: number;
  date: Date;
  transactionType: string;
  bankAccountId: string;
  recipientBankAccountId: string;
  replicated: boolean;
}

interface AccountTransactionCreationAttributes extends Optional<AccountTransactionAttributes, "replicated" | "id"> {}

interface RequestQuery {
  firstName: string;
  lastName: string;
}

export {
  ClientAttributes,
  ClientCreationAttributes,
  AccountTransactionAttributes,
  AccountTransactionCreationAttributes,
  BankAccountAttributes,
  BankAccountCreationAttributes,
  DepartmentAttributes,
  ReplicationAttributes,
  RequestQuery,
  ApiError
};
