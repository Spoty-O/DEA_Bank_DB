import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BankAccountAttributes, ClientAttributes } from '@backend/types';

export const API = createApi({
  reducerPath: 'baseAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API_DOMEN,
  }),
  endpoints: (build) => ({
    // Получение списка клиентов
    getClients: build.query<ClientAttributes[], number>({
      query: (page) => ({
        url: 'clients',
        method: 'GET',
        params: {
          limit: 12,
          offset: page * 12 - 12,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    // Получение данных о клиенте
    getClientData: build.query<ClientAttributes, string>({
      query: (id) => ({
        url: `clients/${id}`,
        method: 'GET',
      }),
    }),

    // Получение данных о клиенте
    getClientBalanceByClientId: build.query<BankAccountAttributes, string>({
      query: (clientId) => ({
        url: 'balance',
        method: 'GET',
        params: {
          clientId,
        },
      }),
    }),
  }),
});
