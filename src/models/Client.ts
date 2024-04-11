import { AllowNull, Column, HasMany, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { BankAccount } from "./BankAccount.js";
import { Department } from "./Department.js";

export interface ClientAttributes {
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

  @HasMany(() => BankAccount, { onDelete: "CASCADE" })
  bankAccounts!: BankAccount[];
}
