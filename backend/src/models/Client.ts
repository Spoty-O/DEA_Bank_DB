import { AllowNull, Column, HasMany, Model, Table, DataType, PrimaryKey } from "sequelize-typescript";
import { BankAccount } from "./BankAccount.js";
import { ClientAttributes } from "../types/types.js";

@Table({
  timestamps: false,
})
export class Client extends Model<ClientAttributes> {
  @PrimaryKey
  @Column(DataType.STRING(40))
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  lastName!: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  phone!: string;

  @HasMany(() => BankAccount, { onDelete: "CASCADE" })
  bankAccounts!: BankAccount[];
}
