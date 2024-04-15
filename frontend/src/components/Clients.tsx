import * as React from 'react';
import Box from '@mui/material/Box';
import { API } from '../services/APIService';
import ClientsTable from './ClientsTable';

const Clients = () => {
  const [page] = React.useState(1);
  const { data: clientsList } = API.useGetClientsQuery(page);

  return <Box>{clientsList && <ClientsTable clientsList={clientsList} />}</Box>;
};

export default Clients;
