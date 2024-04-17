import * as React from 'react';
import { API } from '../services/APIService';
import TableComponent from './TableComponent';
import { Box, Button, Card, TextField } from '@mui/material';
import ClientData from './ClientData';
import {
  AccountTransactionAttributes,
  BankAccountAttributes,
  ClientAttributes,
} from '@backend/types';
import ClientBalance from './ClientBalance';
import BankAccountTransactions from './BankAccountTransactions';

const Clients = () => {
  const [page] = React.useState(1);
  const { data: clientsList } = API.useGetClientsQuery(page);
  const [client, setClient] = React.useState<ClientAttributes>();
  const [bankAccount, setBankAccount] = React.useState<BankAccountAttributes>();
  const [accountTransaction, setAccountTransaction] =
    React.useState<AccountTransactionAttributes>();

  React.useEffect(() => {
    console.log(accountTransaction)
    // очистка данных при смене клиента
    setBankAccount(undefined);
  }, [client]);

  return (
    <>
      <div className="flex gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex w-full gap-3">
              <TextField
                className="w-full"
                id="firstName"
                label="Firstname"
                size="small"
                required
              />
              <TextField
                className="w-full"
                id="lastName"
                label="Lastname"
                size="small"
                required
              />
            </div>
            <Button variant="contained">Find</Button>
          </div>
          <div className="flex flex-col gap-5">
            <TableComponent list={clientsList} setState={setClient} />
          </div>
        </div>
        {client && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 w-full">
              <Card variant="outlined" sx={{ minWidth: 320 }}>
                <Box sx={{ p: 2 }}>
                  <ClientData client={client} setClient={setClient} />
                </Box>
              </Card>
            </div>
          </div>
        )}
      </div>
      {client && (
        // Получение баланса клиента
        <ClientBalance clientId={client.id} setState={setBankAccount} />
      )}
      {bankAccount && (
        // Получение списка транзакций по счету
        <BankAccountTransactions
          bankAccountId={bankAccount.id}
          setState={setAccountTransaction}
        />
      )}
    </>
  );
};
export default Clients;
