import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { API } from '../services/APIService';
import { ApiError, ClientCreationAttributes } from '@backend/types';

const CreateClient = () => {
  const [createClient, { error }] = API.useCreateClientMutation();
  const [formData, setFormData] = useState<ClientCreationAttributes>({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createClient(formData);
  };

  return (
    <form className="flex gap-4 flex-col" onSubmit={handler}>
      <TextField
        name="firstName"
        label="Firstname"
        variant="outlined"
        value={formData.firstName}
        onChange={handleChange}
      />
      <TextField
        name="lastName"
        label="Lastname"
        variant="outlined"
        value={formData.lastName}
        onChange={handleChange}
      />
      <TextField
        name="phone"
        label="Phone"
        variant="outlined"
        value={formData.phone}
        onChange={handleChange}
      />
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

export default CreateClient;
