import React from 'react';
import Clients from '../components/Clients';

const index = () => {
  return (
    <div className="flex p-5">
      <div className='flex flex-col gap-5'>
        <p className="text-2xl font-bold">Clients:</p>
        <Clients />
      </div>
    </div>
  );
};

export default index;
