import { Sequelize, SequelizeOptions } from "sequelize-typescript";

export default class DataBaseController {
  sequelize: Sequelize;
  constructor(options: SequelizeOptions | undefined) {
    this.sequelize = new Sequelize(options);
  }

  async connectDB(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync({ alter: true });
      console.log("✅ Connection has been established successfully.");
    } catch (error) {
      await this.sequelize.close();
      console.error("Unable to connect to the database:", error);
    }
  }

  async disconnectDB(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log("✅ Connection has been closed successfully.");
    } catch (error) {
      console.error("Unable to close the database connection:", error);
      throw error; // Пробрасываем ошибку для обработки во внешнем коде
    }
  }
}
