import * as React from 'react';
import { API } from '../services/APIService';
import TableComponent from './TableComponent';
import { Box, Button, Card, TextField } from '@mui/material';
import ClientData from './UpdateClientData';
import {
  AccountTransactionAttributes,
  ApiError,
  BankAccountAttributes,
  ClientAttributes,
} from '@backend/types';
import ClientBankAccounts from './ClientBankAccounts';
import BankAccountTransactions from './BankAccountTransactions';
import CreateClient from './CreateClient';
import CreateBankAccount from './CreateBankAccount';
import UpdateBankAccounts from './UpdateBankAccounts';
import CreateTransaction from './CreateTransaction';

const Clients = () => {
  const [page] = React.useState(1);
  const { data: clientsList } = API.useGetClientsQuery(page);
  const [findClients, { error: findError }] = API.useGetClientByNameMutation();
  const [findClientState, setFindClientState] =
    React.useState<ClientAttributes>({
      firstName: '',
      lastName: '',
    });
  const [client, setClient] = React.useState<ClientAttributes>();
  const [bankAccount, setBankAccount] = React.useState<BankAccountAttributes>();
  const [accountTransaction, setAccountTransaction] =
    React.useState<AccountTransactionAttributes>();

  React.useEffect(() => {
    console.log(accountTransaction);
    // очистка данных при смене клиента
    setBankAccount(undefined);
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindClientState({
      ...findClientState,
      [e.target.name]: e.target.value,
    });
    console.log(findClientState);
  };

  const findHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await findClients(findClientState);
    // console.log(findClientState);
  };

  return (
    <>
      <div className="flex gap-5 w-full flex-col xl:flex-row">
        <Card className="flex flex-col gap-5 w-full p-5 min-w-[700px]">
          <form className="flex flex-col gap-2" onSubmit={findHandler}>
            <h2 className="text-2xl font-semibold">Users:</h2>
            <div className="flex w-full gap-3">
              <TextField
                className="w-full"
                name="firstName"
                label="Firstname"
                size="small"
                value={findClientState.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                className="w-full"
                name="lastName"
                label="Lastname"
                size="small"
                value={findClientState.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <Button variant="contained" type="submit">
              Find
            </Button>
            {findError && 'data' in findError ? (
              <span className="flex-1 text-red-700 text-sm font-semibold text-center">
                <>{(findError.data as ApiError).message}</>
              </span>
            ) : null}
          </form>
          <div className="flex flex-col gap-5">
            <TableComponent list={clientsList} setState={setClient} />
          </div>
        </Card>
        <div className="flex gap-3 flex-wrap md:flex-nowrap xl:flex-wrap 2xl:flex-nowrap">
          <Card variant="outlined" sx={{ minWidth: 320, width: '100%' }}>
            <Box sx={{ p: 2 }}>
              <h3 className="flex justify-center font-bold mb-2 uppercase">
                create client
              </h3>
              <CreateClient />
            </Box>
          </Card>
          {client && (
            <Card variant="outlined" sx={{ minWidth: 320, width: '100%' }}>
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
      {client && client.id && (
        // Получение баланса клиента
        <div className="flex gap-5 w-full flex-col xl:flex-row">
          <Card className="flex flex-col gap-5 w-full p-5 min-w-[700px]">
            <ClientBankAccounts
              clientId={client.id}
              setState={setBankAccount}
            />
          </Card>
          <div className="flex gap-3 flex-wrap md:flex-nowrap xl:flex-wrap 2xl:flex-nowrap">
            <Card variant="outlined" sx={{ minWidth: 320, width: '100%' }}>
              <Box sx={{ p: 2 }}>
                <h3 className="flex justify-center font-bold mb-2 uppercase">
                  create bank account
                </h3>
                <CreateBankAccount clientId={client.id} />
              </Box>
            </Card>
            {bankAccount && (
              <Card variant="outlined" sx={{ minWidth: 320, width: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <h3 className="flex justify-center font-bold mb-2 uppercase">
                    update bank account
                  </h3>
                  <UpdateBankAccounts
                    bankAccount={bankAccount}
                    setBankAccount={setBankAccount}
                  />
                </Box>
              </Card>
            )}
          </div>
        </div>
      )}
      {bankAccount && bankAccount.id && (
        // Добавление транзакции
        <>
          <div className="flex justify-center">
            <Card
              variant="outlined"
              sx={{
                minWidth: 320,
                width: '100%',
                '@media (min-width:800px)': {
                  width: 400,
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <h3 className="flex justify-center font-bold mb-2 uppercase">
                  create transaction
                </h3>
                <CreateTransaction bankAccountId={bankAccount.id} />
              </Box>
            </Card>
          </div>
          {/* // Получение списка транзакций по счету */}
          <BankAccountTransactions
            bankAccountId={bankAccount.id}
            setState={setAccountTransaction}
          />
        </>
      )}
    </>
  );
};
export default Clients;
