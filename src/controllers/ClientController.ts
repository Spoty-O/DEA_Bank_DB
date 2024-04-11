import ApiError from "../helpers/ApiErrors.js";
import { createHash } from "crypto";
import { generateRandomPhoneNumber, getRandomLastName, getRandomName } from "../helpers/GenerateClientEntries.js";
import { Request, Response, NextFunction } from "express";
import { Client, ClientAttributes } from "../models/Client.js";
import { Department } from "../models/Department.js";

class ClientController {
  async initialize(departments: Department[]): Promise<Client[]> {
    const clientsValues: ClientAttributes[] = [];
    for (const department of departments) {
      for (let i = 0; i < 5; i++) {
        const firstName = getRandomName();
        const lastName = getRandomLastName();
        const phone = generateRandomPhoneNumber();
        clientsValues.push({
          id: createHash("sha1")
            .update(firstName + lastName + phone)
            .digest("hex"),
          firstName: getRandomName(),
          lastName: getRandomLastName(),
          phone: generateRandomPhoneNumber(),
          departmentId: department.id,
        });
      }
    }
    return await Client.bulkCreate(clientsValues);
  }

  getClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);
      if (!client) {
        return next(ApiError.notFound("Client not found"));
      }
      res.json(client);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error getting client"));
    }
  };

  createClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, phone, departmentId } = req.body;

      if (!firstName || !lastName || !phone || !departmentId) {
        return next(ApiError.badRequest("firstName, lastName, phone, departmentId are required"));
      }

      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phone.match(phoneRegex)) {
        return next(ApiError.badRequest("Phone number is invalid format (123-456-7890)"));
      }

      const client = await Client.create({
        id: createHash("sha1")
          .update(firstName + lastName + phone)
          .digest("hex"),
        firstName,
        lastName,
        phone,
        departmentId,
      });

      res.json(client);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error creating client"));
    }
  };

  updateClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, phone, departmentId } = req.body;

      if (!id) return next(ApiError.badRequest("clientId is required"));

      if (!firstName || !lastName || !phone || !departmentId) {
        return next(ApiError.badRequest("firstName, lastName, phone, departmentId are required"));
      }

      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phone.match(phoneRegex)) {
        return next(ApiError.badRequest("Phone number is invalid format (123-456-7890)"));
      }

      const client = await Client.findByPk(id);
      if (!client) return next(ApiError.notFound("Client not found"));

      await Client.update({ firstName, lastName, phone, departmentId }, { where: { id } });

      res.json(client);
    } catch (error) {
      console.log(error);
      return next(ApiError.internal("Error updating client"));
    }
  };
}

export default new ClientController();
