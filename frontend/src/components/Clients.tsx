import * as React from 'react';
import { API } from '../services/APIService';
import TableComponent from './TableComponent';
import { Box, Button, Card, TextField } from '@mui/material';
import ClientData from './ClientData';
import { ClientAttributes } from '@backend/types';
import ClientBalance from './ClientBalance';

const Clients = () => {
  const [page] = React.useState(1);
  const { data: clientsList } = API.useGetClientsQuery(page);
  const [client, setClient] = React.useState<ClientAttributes>();

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
            <TableComponent list={clientsList} setClient={setClient} />
          </div>
        </div>
        {client && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 w-full">
              <Card variant="outlined" sx={{ minWidth: 320 }}>
                <Box sx={{ p: 2 }}>
                  <ClientData client={client} setClient={setClient} />
                  <Card variant="outlined" sx={{ minWidth: 320, mt: 2 }}>
                    <Box sx={{ p: 2 }}>
                      <ClientBalance clientId={client.id} />
                    </Box>
                  </Card>
                </Box>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Clients;
