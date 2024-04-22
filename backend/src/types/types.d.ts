import { Optional } from "sequelize";
import ApiError from "../helpers/ApiErrors.ts";

interface DepartmentAttributes {
  id: number;
  address: string;
  city: string;
  phone: string;
  domain: string;
  APIKey: string;
}

interface DepartmentCreationAttributes extends Optional<DepartmentAttributes, "id" | "APIKey"> {}

interface ReplicationAttributes {
  id: number;
  clientId: string; // hash id
  firstName: string;
  lastName: string;
  recipientDepartmentId: number;
  donorDepartmentId: number;
}

interface ReplicationCreationAttributes extends Optional<ReplicationAttributes, "id"> {}

interface ClientAttributes {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  replicated: boolean;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, "replicated" | "id"> {}
interface ClientFindByNameAttributes extends Optional<ClientCreationAttributes, "phone"> {}

interface BankAccountAttributes {
  id: string;
  balance: number;
  clientId: string;
  replicated: boolean;
}

interface BankAccountCreationAttributes extends Optional<BankAccountAttributes, "replicated" | "id"> {}
interface BankAccountFindAttributes extends Optional<BankAccountCreationAttributes, "balance"> {}

interface AccountTransactionAttributes {
  id: string;
  amount: number;
  date: Date;
  transactionType: string;
  bankAccountId: string;
  recipientBankAccountId: string;
  replicated: boolean;
}

interface AccountTransactionCreationAttributes extends Optional<AccountTransactionAttributes, "replicated" | "id" | "date"> {}
interface AccountTransactionFindAttributes extends Optional<AccountTransactionCreationAttributes, "amount" | "recipientBankAccountId" | "transactionType"> {}

type RequestQueryGet<T> = T & {
  [key: string]: string;
  noReplicate?: string;
}

export {
  ClientAttributes,
  ClientCreationAttributes,
  ClientFindByNameAttributes,
  BankAccountAttributes,
  BankAccountCreationAttributes,
  BankAccountFindAttributes,
  AccountTransactionAttributes,
  AccountTransactionCreationAttributes,
  AccountTransactionFindAttributes,
  DepartmentAttributes,
  DepartmentCreationAttributes,
  ReplicationAttributes,
  ReplicationCreationAttributes,
  RequestQueryGet,
  ApiError
};
