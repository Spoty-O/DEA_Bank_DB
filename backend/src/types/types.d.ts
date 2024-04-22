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
  replicated?: boolean;
}

interface AccountTransactionAttributes {
  id?: string;
  amount?: number;
  date?: Date;
  transactionType?: string;
  bankAccountId: string;
  recipientBankAccountId?: string;
  replicated?: boolean;
}

type RequestParamsGet<T> = T & {
  [key: string]: string;
};

type RequestQueryGet<T> = T & {
  [key: string]: string;
  noReplicate?: string;
};

export {
  ClientAttributes,
  BankAccountAttributes,
  AccountTransactionAttributes,
  DepartmentAttributes,
  ReplicationAttributes,
  RequestQueryGet,
  RequestParamsGet,
  ApiError,
};
