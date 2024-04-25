import React, { FC } from 'react';
import { API } from '../services/APIService';
import { BankAccountAttributes } from '@backend/types';
import TableComponent from './TableComponent';

interface BankAccountDataProps {
  clientId: string;
  id?: string;
  setState: React.Dispatch<
    React.SetStateAction<BankAccountAttributes | undefined>
  >;
}

const BankAccount: FC<BankAccountDataProps> = ({ clientId, id, setState }) => {
  const { data: bankAccount, error } =
    API.useGetClientBankAccountsByClientIdQuery(clientId);

  return (
    <>
      <h2 className="text-2xl font-semibold">Bank accounts:</h2>
      {!error && bankAccount && (
        <TableComponent
          list={bankAccount}
          setState={setState}
          isActive={bankAccount.findIndex((c) => c.id === id)}
        />
      )}
    </>
  );
};

export default BankAccount;
