import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { API } from '../services/APIService';
import { AccountTransactionAttributes, ApiError } from '@backend/types';

interface TransactionProps {
  bankAccountId: string;
}

const CreateTransaction: React.FC<TransactionProps> = ({ bankAccountId }) => {
  console.log(bankAccountId);
  const [createTransaction, { error }] = API.useCreateTransactionMutation();
  const [formData, setFormData] =
    useState<AccountTransactionAttributes>({
      amount: 0,
      transactionType: '',
      bankAccountId,
      recipientBankAccountId: '',
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const typeChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      transactionType: e.target.value,
    });
    console.log(formData);
  };

  const handler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.bankAccountId = bankAccountId;
    await createTransaction(formData);
  };

  return (
    <form className="flex gap-4 flex-col" onSubmit={handler}>
      <TextField
        name="bankAccountId"
        label="bankAccountId"
        value={bankAccountId}
        InputProps={{ readOnly: true }}
        variant="filled"
        size="small"
      />
      <TextField
        name="amount"
        label="amount"
        value={formData.amount}
        onChange={handleChange}
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
      />
      <FormControl>
        <InputLabel id="type">type</InputLabel>
        <Select
          labelId="type"
          id="type"
          value={formData.transactionType}
          label="type"
          onChange={typeChange}
          required
        >
          <MenuItem value={'deposit'}>Deposit</MenuItem>
          <MenuItem value={'withdraw'}>Withdraw</MenuItem>
          <MenuItem value={'transfer'}>Transfer</MenuItem>
        </Select>
      </FormControl>
      {formData.transactionType === 'transfer' && (
        <TextField
          name="recipientBankAccountId"
          label="recipientBankAccountId"
          variant="outlined"
          value={formData.recipientBankAccountId}
          onChange={handleChange}
        />
      )}
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

export default CreateTransaction;
