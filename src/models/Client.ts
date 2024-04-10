import { AllowNull, Column, HasMany, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { generateRandomPhoneNumber, getRandomLastName, getRandomName } from "../helpers/GenerateClientEntries.js";
import { BankAccount } from "./BankAccount.js";
import { Department } from "./Departments.js";

interface ClientAttributes {
  firstName: string;
  lastName: string;
  phone: string;
  departmentId: number;
}

@Table({
  timestamps: false,
})
export class Client extends Model<ClientAttributes> {
  @AllowNull(false)
  @Column(DataType.STRING(100))
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  lastName!: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  phone!: string;

  @ForeignKey(() => Department)
  @Column(DataType.INTEGER)
  departmentId!: number;

  @BelongsTo(() => Department)
  department!: Department;

  @HasMany(() => BankAccount, { onDelete: "CASCADE" })
  bankAccounts!: BankAccount[];

  async initialize(departments: Department[]): Promise<Client[]> {
    let clientsValues: ClientAttributes[] = [];
    for (const department of departments) {
      clientsValues.push({
        firstName: getRandomName(),
        lastName: getRandomLastName(),
        phone: generateRandomPhoneNumber(),
        departmentId: department.id,
      });
    }
    return await Client.bulkCreate(clientsValues);
  }
}

export const ClientController = new Client();
