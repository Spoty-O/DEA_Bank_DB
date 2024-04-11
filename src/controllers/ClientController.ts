import ApiError from "../helpers/ApiErrors.js";
import { generateRandomPhoneNumber, getRandomLastName, getRandomName } from "../helpers/GenerateClientEntries.js";
import { Client, ClientAttributes } from "../models/Client.js";
import { Department } from "../models/Department.js";

class ClientController {
  async initialize(departments: Department[]): Promise<Client[]> {
    const clientsValues: ClientAttributes[] = [];
    for (const department of departments) {
      for (let i = 0; i < 5; i++) {
        clientsValues.push({
          firstName: getRandomName(),
          lastName: getRandomLastName(),
          phone: generateRandomPhoneNumber(),
          departmentId: department.id,
        });
      }
    }
    return await Client.bulkCreate(clientsValues);
  }
}

export default new ClientController();
