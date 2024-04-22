import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AccountTransactionAttributes,
  BankAccountAttributes,
  ClientAttributes,
} from '@backend/types';

console.log(process.env);

export const API = createApi({
  reducerPath: 'baseAPI',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.REACT_APP_SERVER_API_DOMEN +
      ':' +
      process.env.REACT_APP_SERVER_PORT +
      '/api',
  }),
  tagTypes: ['Clients', 'BankAccount', 'Transactions'],
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

    // Поиск клиента по имени и фамилии
    getClientByName: build.mutation<ClientAttributes, ClientAttributes>({
      query: (data) => ({
        url: `clients/find`,
        method: 'GET',
        params: data,
      }),
      invalidatesTags: ['Clients'],
    }),

    //создание клиента
    createClient: build.mutation<ClientAttributes, ClientAttributes>({
      query: (data) => ({
        url: 'clients',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Clients'],
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

    // Получение баланса клиента
    getClientBankAccountsByClientId: build.query<
      BankAccountAttributes[],
      string
    >({
      query: (clientId) => ({
        url: 'bankAccounts',
        method: 'GET',
        params: {
          clientId,
        },
      }),
      providesTags: ['BankAccount'],
    }),

    // Создание банковского счета
    createBankAccount: build.mutation<
      BankAccountAttributes,
      BankAccountAttributes
    >({
      query: (data) => ({
        url: 'bankAccounts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['BankAccount'],
    }),

    // Обновление баланса клиента
    updateBankAccount: build.mutation<
      BankAccountAttributes,
      BankAccountAttributes
    >({
      query: (data) => ({
        url: `bankAccounts/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['BankAccount'],
    }),

    // Получение списка транзакций по счету
    getTransactions: build.query<AccountTransactionAttributes[], string>({
      query: (id) => ({
        url: `transactions/${id}`,
        method: 'GET',
      }),
      providesTags: ['Transactions'],
    }),

    // Deposit transaction
    createTransaction: build.mutation<
      AccountTransactionAttributes,
      AccountTransactionAttributes
    >({
      query: (data) => ({
        url: `transactions/${data.transactionType}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Transactions', 'BankAccount'],
    }),
  }),
});
