import {
  AllowNull,
  Column,
  HasMany,
  Model,
  Table,
  DataType,
} from "sequelize-typescript";
import { Client } from "./Client.js";

interface DepartmentAttributes {
  address: string;
  city: string;
  phone: string;
}

@Table({
  timestamps: false,
})
export class Department extends Model<DepartmentAttributes> {
  @AllowNull(false)
  @Column(DataType.STRING)
  address!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  city!: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  phone!: string;

  @HasMany(() => Client, { onDelete: "CASCADE" })
  clients!: Client[];

  async initialize(): Promise<Department[]> {
    await Department.destroy({ cascade: true, truncate: true });
    return await Department.bulkCreate([
      { address: "123 Main St", city: "New York", phone: "123-456-7890" },
      { address: "456 Elm St", city: "New York", phone: "456-789-0123" },
    ]);
  }
}

export const DepartmentController = new Department()
