import ApiError from "../helpers/ApiErrors.js";
import { generateRandomPhoneNumber, getRandomLastName, getRandomName } from "../helpers/GenerateClientEntries.js";
import { Response, NextFunction } from "express";
import { Client } from "../models/Client.js";
import { ClientAttributes, RequestQuery } from "../types/types.js";
import { AxiosGetRequest, AxiosUpdateRequest } from "../helpers/AxiosRequest.js";
import { TClientCreateValidated, TClientGetValidated } from "../helpers/ZodSchemas/UserSchema.js";

class ClientController {
  static async initialize(): Promise<Client[]> {
    const clientsValues: ClientAttributes[] = [];
    for (let i = 0; i < 5; i++) {
      clientsValues.push({
        firstName: getRandomName(),
        lastName: getRandomLastName(),
        phone: generateRandomPhoneNumber(),
      });
    }
    return await Client.bulkCreate(clientsValues);
  }

  static async getAllClients(req: MyRequest, res: Response, next: NextFunction) {
    try {
      const clients = await Client.findAll();
      res.json(clients);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting clients"));
    }
  }

  static async getClientByName(
    req: MyRequest<{ id: string }, TClientGetValidated, ClientAttributes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { firstName, lastName, serverRequest } = req.query;
      const client = await Client.findOne({ where: { firstName, lastName } });
      if (!client) {
        if (serverRequest === "false" || !serverRequest) {
          return next();
        }
        return next(ApiError.notFound("Client not found"));
      }
      if (serverRequest === "true") {
        req.params.id = client.id;
        const body = client.dataValues;
        body.replicated = true;
        req.body = body;
        return next();
      }
      return res.json(client);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async getClientFromMain(
    req: MyRequest<unknown, TClientGetValidated, ClientAttributes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await AxiosGetRequest<Client, TClientGetValidated>(
        "http://localhost:5000/api/replication/client",
        req.query,
        process.argv[4],
      );
      if (result instanceof ApiError) {
        return next(result);
      }
      console.log(result.data);
      req.body = result.data;
      return next();
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async createClient(
    req: MyRequest<{ id: string }, TClientGetValidated, TClientCreateValidated>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const client = await Client.create(req.body);
      return res.json(client);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error creating client"));
    }
  }

  static async updateClient(
    req: MyRequest<{ id: string }, RequestQuery, TClientCreateValidated, TClientCreateValidated>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { serverRequest } = req.query;
      let client = await Client.findByPk(id);
      if (!client) {
        return next(ApiError.notFound("Client not found"));
      }
      console.log(req.body)
      client = await client.update(req.body);
      req.data = client;
      res.json(client);
      if (serverRequest === "false" || !serverRequest) {
        next();
      }
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error updating client"));
    }
  }

  static async updateReplicationsForClient(
    req: MyRequest<{ id: string }, unknown, unknown, TClientCreateValidated>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      if (!req.data) {
        return 
      }
      const result = await AxiosUpdateRequest<{ message: string }, { id: string }, TClientCreateValidated>(
        `http://localhost:5000/api/replication/client/${id}`,
        { id: id },
        req.data,
        process.argv[4],
      );
      console.log(result)
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error updating client"));
    }
  }
}

export default ClientController;
