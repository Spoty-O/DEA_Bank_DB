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

interface RequestQuery {
  firstName: string;
  lastName: string;
  noReplicate?: boolean;
}

export {
  ClientAttributes,
  ClientCreationAttributes,
  ClientFindByNameAttributes,
  AccountTransactionAttributes,
  AccountTransactionCreationAttributes,
  BankAccountAttributes,
  BankAccountCreationAttributes,
  DepartmentAttributes,
  DepartmentCreationAttributes,
  ReplicationAttributes,
  ReplicationCreationAttributes,
  RequestQuery,
  ApiError
};
