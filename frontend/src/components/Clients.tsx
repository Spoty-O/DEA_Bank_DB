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
import CreateClient from './CreateClient';

const Clients = () => {
  const [page] = React.useState(1);
  const { data: clientsList } = API.useGetClientsQuery(page);
  const [client, setClient] = React.useState<ClientAttributes>();
  const [bankAccount, setBankAccount] = React.useState<BankAccountAttributes>();
  const [accountTransaction, setAccountTransaction] =
    React.useState<AccountTransactionAttributes>();

  React.useEffect(() => {
    console.log(accountTransaction);
    // очистка данных при смене клиента
    setBankAccount(undefined);
  }, [client]);

  return (
    <>
      <div className="flex gap-5">
        <Card className="flex flex-col gap-5 w-1/2 p-5">
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
        </Card>
        <div className="flex gap-3">
          <Card variant="outlined" sx={{ minWidth: 350 }}>
            <Box sx={{ p: 2 }}>
              <h3 className="flex justify-center font-bold mb-2 uppercase">
                create client
              </h3>
              <CreateClient />
            </Box>
          </Card>
          {client && (
            <Card variant="outlined" sx={{ minWidth: 350 }}>
              <Box sx={{ p: 2 }}>
                <h3 className="flex justify-center font-bold mb-2 uppercase">
                  update client
                </h3>
                <ClientData client={client} setClient={setClient} />
              </Box>
            </Card>
          )}
        </div>
      </div>
      {client && (
        // Получение баланса клиента
        <div className="flex gap-5">
          <Card className="flex flex-col gap-5 w-1/2 p-5">
            <ClientBalance clientId={client.id} setState={setBankAccount} />
          </Card>
          <div className="flex gap-3">
            <Card className="" variant="outlined" sx={{ minWidth: 350 }}>
              <Box sx={{ p: 2 }}>
                <h3 className="flex justify-center font-bold mb-2 uppercase">
                  create bank account
                </h3>
                <ClientData client={client} setClient={setClient} />
              </Box>
            </Card>
            <Card variant="outlined" sx={{ minWidth: 350 }}>
              <Box sx={{ p: 2 }}>
                <h3 className="flex justify-center font-bold mb-2 uppercase">
                  update bank account
                </h3>
                <ClientData client={client} setClient={setClient} />
              </Box>
            </Card>
          </div>
        </div>
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
