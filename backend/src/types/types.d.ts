interface DepartmentAttributes {
  [id: string]: number;
  address: string;
  city: string;
  phone: string;
  domain: string;
}

interface ReplicationAttributes {
  id: number;
  [clientId: string]: string; // hash id
  firstName: string;
  lastName: string;
  departmentId: number;
}

interface ClientAttributes {
  [id: string]: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface AccountTransactionAttributes {
  id: number;
  amount: number;
  date: Date;
  transactionType: string;
  bankAccountId: string;
  recipientBankAccountId: string;
}

interface BankAccountAttributes {
  id: string;
  balance: number;
  [clientId: string]: string;
}

export {
  ClientAttributes,
  AccountTransactionAttributes,
  BankAccountAttributes,
  DepartmentAttributes,
  ReplicationAttributes,
};
