import { ClientAttributes } from '@backend/types';
import { Button, TextField } from '@mui/material';
import * as React from 'react';
import { API } from '../services/APIService';

function updateData(
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

const UpdateClientData: React.FC<ClientDataProps> = ({ client, setClient }) => {
  const [clientUpdate] = API.useUpdateClientDataMutation();

  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await clientUpdate(client);
    console.log(res);
  }

  return (
    <form className="flex gap-4 flex-col" onSubmit={handler}>
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
          setClient(updateData(client, e.target.name, e.target.value));
        }}
      />
      <TextField
        name="lastName"
        label="Lastname"
        variant="outlined"
        value={client.lastName}
        onChange={(e) => {
          setClient(updateData(client, e.target.name, e.target.value));
        }}
      />
      <TextField
        name="phone"
        label="Phone"
        variant="outlined"
        value={client.phone}
        onChange={(e) => {
          setClient(updateData(client, e.target.name, e.target.value));
        }}
      />
      <Button variant="contained" type="submit">
        Save
      </Button>
    </form>
  );
};

export default UpdateClientData;
