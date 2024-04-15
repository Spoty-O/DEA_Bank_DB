import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { IClientData, IClientsList } from '../models/types';

export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API_DOMEN,
  }),
  endpoints: (build) => ({
    // Получение списка клиентов
    getClients: build.query<IClientsList, number>({
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
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    // Получение данных о клиенте
    getClientData: build.query<IClientData, string>({
      query: (id) => ({
        url: `clients/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
