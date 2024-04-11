import ApiError from "../helpers/ApiErrors.js";
import { Department } from "../models/Department.js";

class DepartmentsController {
  async initialize(): Promise<Department[]> {
    await Department.destroy({ cascade: true, truncate: true });
    return await Department.bulkCreate([
      { address: "123 Main St", city: "New York", phone: "123-456-7890" },
      { address: "456 Elm St", city: "New York", phone: "456-789-0123" },
    ]);
  }
}

export default new DepartmentsController();
