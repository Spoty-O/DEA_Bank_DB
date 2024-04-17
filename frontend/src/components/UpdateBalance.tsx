import { BankAccountAttributes } from '@backend/types';
import { Button, TextField } from '@mui/material';
import * as React from 'react';
import { API } from '../services/APIService';

function updateData(
  row: BankAccountAttributes,
  name: string,
  value: string,
): BankAccountAttributes {
  // Создаем копию объекта клиента и обновляем нужное поле
  const updated = { ...row, [name]: value };
  return updated;
}

interface BalanceProps {
  bankAccount: BankAccountAttributes;
  setBankAccount: React.Dispatch<
    React.SetStateAction<BankAccountAttributes | undefined>
  >;
}

const UpdateBalance: React.FC<BalanceProps> = ({
  bankAccount,
  setBankAccount,
}) => {
  const [clientUpdate] = API.useUpdateBankAccountMutation();

  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await clientUpdate(bankAccount);
    console.log(res);
  }

  return (
    <form className="flex gap-4 flex-col" onSubmit={handler}>
      <TextField
        name="id"
        label="ID"
        value={bankAccount.id}
        InputProps={{ readOnly: true }}
        variant="filled"
        size="small"
      />
      <TextField
        name="balance"
        label="balance"
        variant="outlined"
        value={bankAccount.balance}
        type="number"
        onChange={(e) => {
          setBankAccount(
            updateData(bankAccount, e.target.name, e.target.value),
          );
        }}
      />
      <TextField
        name="clientId"
        label="clientId"
        value={bankAccount.clientId}
        InputProps={{ readOnly: true }}
        variant="filled"
        size="small"
      />
      <Button variant="contained" type="submit">
        Save
      </Button>
    </form>
  );
};

export default UpdateBalance;
