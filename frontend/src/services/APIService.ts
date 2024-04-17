import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AccountTransactionAttributes,
  BankAccountAttributes,
  ClientAttributes,
} from '@backend/types';

export const API = createApi({
  reducerPath: 'baseAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API_DOMEN,
  }),
  tagTypes: ['Clients'],
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
      providesTags: ['Clients'],
    }),

    // Получение данных о клиенте
    getClientData: build.query<ClientAttributes, string>({
      query: (id) => ({
        url: `clients/${id}`,
        method: 'GET',
      }),
    }),

    // Обновление данных о клиенте
    updateClientData: build.mutation<ClientAttributes, ClientAttributes>({
      query: (data) => ({
        url: `/clients/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Clients'],
    }),

    // Получение данных о клиенте
    getClientBalanceByClientId: build.query<BankAccountAttributes[], string>({
      query: (clientId) => ({
        url: 'balance',
        method: 'GET',
        params: {
          clientId,
        },
      }),
    }),

    // Получение списка транзакций по счету
    getTransactions: build.query<AccountTransactionAttributes[], string>({
      query: (id) => ({
        url: `transactions/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
