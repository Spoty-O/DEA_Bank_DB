import { AllowNull, Column, HasMany, Model, Table, DataType, PrimaryKey, Default } from "sequelize-typescript";
import { BankAccount } from "./BankAccount.js";
import { ClientAttributes, ClientCreationAttributes } from "../types/types.js";

@Table({
  timestamps: false,
})
export class Client extends Model<ClientAttributes, ClientCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
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

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  replicated!: boolean;

  @HasMany(() => BankAccount, { onDelete: "CASCADE" })
  bankAccounts!: BankAccount[];
}
