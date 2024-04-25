import React, { FC } from 'react';
import { API } from '../services/APIService';
import { AccountTransactionAttributes } from '@backend/types';
import TableComponent from './TableComponent';

interface TransactionsDataProps {
  bankAccountId: string;
  setState: React.Dispatch<
    React.SetStateAction<AccountTransactionAttributes | undefined>
  >;
}

const BankAccountTransactions: FC<TransactionsDataProps> = ({
  bankAccountId,
  setState,
}) => {
  const { data: bankAccount } = API.useGetTransactionsQuery(bankAccountId);

  return (
    <div className="min-h-96">
      <h2 className="text-2xl font-semibold mb-3">Transactions:</h2>
      <TableComponent<AccountTransactionAttributes>
        list={bankAccount}
        setState={setState}
      />
    </div>
  );
};

export default BankAccountTransactions;
