import { ModelCtor, Sequelize } from "sequelize-typescript";

export default class DataBaseController {
  sequelize: Sequelize;
  constructor(
    database: string | undefined,
    username: string | undefined,
    password: string | undefined,
    host: string | undefined,
    models: string[] | ModelCtor[] | undefined,
  ) {
    this.sequelize = new Sequelize({
      database,
      dialect: "postgres",
      username,
      password,
      host,
      port: 5432,
      models, // or [Player, Team],
      pool: {
        idle: 10000,
        acquire: 30000,
      },
    });
  }

  async connectDB(): Promise<void> {
    try {
      await this.sequelize.authenticate();
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
