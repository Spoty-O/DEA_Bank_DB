import React, { FC } from 'react';
import { API } from '../services/APIService';

interface ClientBalanceDataProps {
  clientId: string;
}

const ClientBalance: FC<ClientBalanceDataProps> = ({ clientId }) => {
  const { data: ClientBalance } =
    API.useGetClientBalanceByClientIdQuery(clientId);

  return (
    <div>
      Balance:{' '}
      <strong>{ClientBalance && ClientBalance.balance.toFixed(2)}</strong>
    </div>
  );
};

export default ClientBalance;
