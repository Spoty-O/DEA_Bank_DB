import {
  AllowNull,
  BelongsToMany,
  Column,
  CreatedAt,
  Default,
  HasMany,
  HasOne,
  Model,
  Table,
  Unique,
  UpdatedAt,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { BankAccount } from "./BankAccount.js";
import { Client } from "./Client.js";

interface DepartmentAttributes {
  id: number;
  address: string;
  city: string;
  phone: string;
  clients: Client[];
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

  @HasMany(() => Client)
  clients!: Client[];
}
