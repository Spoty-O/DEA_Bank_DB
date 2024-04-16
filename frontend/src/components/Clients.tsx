import * as React from 'react';
import { API } from '../services/APIService';
import TableComponent from './TableComponent';
import { Box, Button, Card, Stack, TextField } from '@mui/material';
import ClientData from './ClientData';
import { ClientAttributes } from '@backend/types';

const Clients = () => {
  const [page] = React.useState(1);
  const { data: clientsList } = API.useGetClientsQuery(page);
  const [client, setClient] = React.useState<ClientAttributes>();

  return (
    <>
      <div className="flex flex-col gap-5">
        <Card variant="outlined" sx={{ minWidth: 400 }}>
          <Box sx={{ p: 2 }}>
            <Stack>
              <div className="flex flex-col gap-5">
                <TextField id="find" label="Find client" />
                <Button variant="contained">Find</Button>
              </div>
            </Stack>
          </Box>
        </Card>
        {client && (
          <Card variant="outlined" sx={{ minWidth: 320 }}>
            <Box sx={{ p: 2 }}>
              <ClientData client={client} setClient={setClient} />
            </Box>
          </Card>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <TableComponent
          list={clientsList}
          link="client"
          setClient={setClient}
        />
      </div>
    </>
  );
};
export default Clients;
