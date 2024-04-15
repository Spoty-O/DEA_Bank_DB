import React from 'react';
import Clients from '../components/Clients';
import { Button, TextField } from '@mui/material';

const index = () => {
  return (
    <div className="flex gap-5 p-5">
      <div className="flex flex-col gap-5 w-80">
        <TextField id="find" label="Find client" />
        <Button variant="contained">Find</Button>
      </div>
      <div className="flex flex-col gap-5">
        <Clients />
      </div>
    </div>
  );
};

export default index;
