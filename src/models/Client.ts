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
  BelongsTo,
} from "sequelize-typescript";
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

  @HasMany(() => BankAccount, {onDelete: "CASCADE"})
  bankAccounts!: BankAccount[];
}