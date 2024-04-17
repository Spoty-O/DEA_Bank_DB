import ApiError from "../helpers/ApiErrors.js";
import { generateRandomPhoneNumber, getRandomLastName, getRandomName } from "../helpers/GenerateClientEntries.js";
import { Request, Response, NextFunction } from "express";
import { Client, ClientCreationAttributes } from "../models/Client.js";
import { v4 as uuidv4 } from "uuid";

class ClientController {
  async initialize(): Promise<Client[]> {
    const clientsValues: ClientCreationAttributes[] = [];
    for (let i = 0; i < 5; i++) {
      clientsValues.push({
        id: uuidv4(),
        firstName: getRandomName(),
        lastName: getRandomLastName(),
        phone: generateRandomPhoneNumber(),
      });
    }
    return await Client.bulkCreate(clientsValues);
  }

  async getAllClients(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await Client.findAll();
      res.json(clients);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting clients"));
    }
  }

  async getClientById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(`id = ${id}`);
      const client = await Client.findByPk(id);
      if (!client) {
        return next(ApiError.notFound("Client not found"));
      }
      res.json(client);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  async getClientByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName } = req.params;
      // console.log(`id = ${id}`);
      const client = await Client.findOne({ where: { firstName, lastName } });
      if (!client) {
        return next(ApiError.notFound("Client not found"));
      }
      res.json(client);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  }

  async createClient(req: Request, res: Response, next: NextFunction) {
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
        id: uuidv4(),
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

  async updateClient(req: Request, res: Response, next: NextFunction) {
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

export default new ClientController();
