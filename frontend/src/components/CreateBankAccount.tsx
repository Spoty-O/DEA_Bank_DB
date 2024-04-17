import { Button } from '@mui/material';
import React, { FC } from 'react';
import { API } from '../services/APIService';
import { ApiError } from '@backend/types';

interface BankAccountProps {
  clientId: string;
}

const CreateBankAccount: FC<BankAccountProps> = ({ clientId }) => {
  const [createBankAccount, { error }] = API.useCreateBankAccountMutation();

  const handler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createBankAccount({ clientId, balance: 0 });
  };

  return (
    <form className="flex gap-4 flex-col" onSubmit={handler}>
      <Button variant="contained" type="submit">
        Create
      </Button>
      {error && 'data' in error ? (
        <span className="flex-1 text-red-700 text-sm font-semibold text-center">
          <>{(error.data as ApiError).message}</>
        </span>
      ) : null}
    </form>
  );
};

export default CreateBankAccount;
