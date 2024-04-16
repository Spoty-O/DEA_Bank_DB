import { ClientAttributes } from '@backend/types';
import { Button, TextField } from '@mui/material';
import * as React from 'react';

function updateClientData(
  row: ClientAttributes,
  name: string,
  value: string,
): ClientAttributes {
  // Создаем копию объекта клиента и обновляем нужное поле
  const updatedClient = { ...row, [name]: value };
  return updatedClient;
}

interface ClientDataProps {
  client: ClientAttributes;
  setClient: React.Dispatch<React.SetStateAction<ClientAttributes | undefined>>;
}

const ClientData: React.FC<ClientDataProps> = ({ client, setClient }) => {
  return (
    <div className="flex gap-4 flex-col">
      <TextField
        name="id"
        label="ID"
        value={client.id}
        InputProps={{ readOnly: true }}
        variant="filled"
        size="small"
      />
      <TextField
        name="firstName"
        label="Firstname"
        variant="outlined"
        value={client.firstName}
        onChange={(e) => {
          setClient(updateClientData(client, e.target.name, e.target.value));
        }}
      />
      <TextField
        name="lastname"
        label="Lastname"
        variant="outlined"
        value={client.lastName}
        onChange={(e) => {
          setClient(updateClientData(client, e.target.name, e.target.value));
        }}
      />
      <TextField
        name="phone"
        label="Phone"
        variant="outlined"
        value={client.phone}
        onChange={(e) => {
          setClient(updateClientData(client, e.target.name, e.target.value));
        }}
      />
      <Button variant="contained">Save</Button>
    </div>
  );
};

export default ClientData;
