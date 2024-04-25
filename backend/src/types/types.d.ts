import ApiError from "../helpers/ApiErrors.ts";

interface DepartmentAttributes {
  id?: number;
  address: string;
  city: string;
  phone: string;
  domain: string;
  APIKey?: string;
}

interface ReplicationAttributes {
  id?: number;
  clientId: string; // hash id
  firstName: string;
  lastName: string;
  recipientDepartmentId: number;
  donorDepartmentId: number;
}

interface ClientAttributes {
  id?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  replicated?: boolean;
}

interface BankAccountAttributes {
  id?: string;
  balance?: number;
  clientId: string;
}

interface AccountTransactionAttributes {
  id?: string;
  amount?: number;
  date?: Date;
  transactionType?: string;
  bankAccountId: string;
  recipientBankAccountId?: string;
}

interface RequestQuery {
  id?: string;
  serverRequest?: "true" | "false";
}

export {
  ClientAttributes,
  BankAccountAttributes,
  AccountTransactionAttributes,
  DepartmentAttributes,
  ReplicationAttributes,
  ApiError,
  RequestQuery,
};
