import ApiError from "../helpers/ApiErrors.js";
import { generateRandomPhoneNumber, getRandomLastName, getRandomName } from "../helpers/GenerateClientEntries.js";
import { Response, NextFunction } from "express";
import { Client } from "../models/Client.js";
import { ClientAttributes } from "../types/types.js";
import AxiosRequest from "../helpers/AxiosRequest.js";
import { TUserValidated } from "../schemas/ReplicationSchema.js";

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
    req: MyRequest<undefined, TUserValidated>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { firstName, lastName, noReplicate } = req.query;
      const client = await Client.findOne({ where: { firstName, lastName } });
      if (!client) {
        if (!noReplicate) {
          return next();
        }
        return next(ApiError.notFound("Client not found"));
      }
      return res.json(client);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async getClientFromMain(
    req: MyRequest<undefined, ClientAttributes>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { firstName, lastName } = req.query;
      const result = await AxiosRequest<Client, ClientAttributes>(
        "http://localhost:5000/api/replication/client",
        { firstName, lastName },
        process.argv[4],
      );
      if (result instanceof ApiError) {
        return next(result);
      }
      console.log(result);
      return res.json(await Client.create(result.data));
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  static async createClient(req: MyRequest<undefined, undefined, ClientAttributes>, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, phone } = req.body;
      console.log(firstName, lastName, phone);
      if (!firstName || !lastName || !phone) {
        return next(ApiError.badRequest("firstName, lastName, phone are required"));
      }

      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phone.match(phoneRegex)) {
        return next(ApiError.badRequest("Phone number is invalid format (123-456-7890)"));
      }

      const client = await Client.create({
        firstName,
        lastName,
        phone,
      });

      res.json(client);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error creating client"));
    }
  }

  static async updateClient(req: MyRequest<ClientAttributes, undefined, ClientAttributes>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { firstName, lastName, phone } = req.body;

      if (!id) return next(ApiError.badRequest("clientId is required"));

      if (!firstName || !lastName || !phone) {
        return next(ApiError.badRequest("firstName, lastName, phone are required"));
      }

      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phone.match(phoneRegex)) {
        return next(ApiError.badRequest("Phone number is invalid format (123-456-7890)"));
      }

      const client = await Client.findByPk(id);
      if (!client) return next(ApiError.notFound("Client not found"));

      await Client.update({ firstName, lastName, phone }, { where: { id } });

      res.json(client);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error updating client"));
    }
  }
}

export default ClientController;
