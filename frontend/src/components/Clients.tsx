import * as React from 'react';
import { API } from '../services/APIService';
import TableComponent from './TableComponent';

const Clients = () => {
  const [page] = React.useState(1);
  const { data: clientsList } = API.useGetClientsQuery(page);

  return <TableComponent list={clientsList} link="client" keyp="id" />;
};
export default Clients;
