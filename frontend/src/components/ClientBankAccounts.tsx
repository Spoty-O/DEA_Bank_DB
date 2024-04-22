import React, { FC } from 'react';
import { API } from '../services/APIService';
import { BankAccountAttributes } from '@backend/types';
import TableComponent from './TableComponent';

interface BankAccountDataProps {
  clientId: string;
  setState: React.Dispatch<
    React.SetStateAction<BankAccountAttributes | undefined>
  >;
}

const BankAccount: FC<BankAccountDataProps> = ({ clientId, setState }) => {
  const { data: BankAccount } =
    API.useGetClientBankAccountsByClientIdQuery(clientId);

  return (
    <>
      <h2 className="text-2xl font-semibold">Bank accounts:</h2>
      <TableComponent list={BankAccount} setState={setState} />
    </>
  );
};

export default BankAccount;
