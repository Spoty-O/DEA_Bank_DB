interface IClientData {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface IClientsList {
  results: { name: string }[];
}

export type { IClientData, IClientsList };
