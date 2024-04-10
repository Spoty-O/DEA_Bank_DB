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
import { AccountTransaction } from "./AccountTransaction.js";
import { Client } from "./Client.js";
import { Department } from "./Departments.js";

interface BankAccountAttributes {
  balance: number;
  clientId: number;
  departmentIdWhereOpen: number;
}

@Table({
  timestamps: false,
})
export class BankAccount extends Model<BankAccountAttributes> {
  @AllowNull(false)
  @Column(DataType.FLOAT(15, 2))
  balance!: number;

  @ForeignKey(() => Client)
  @Column(DataType.INTEGER)
  clientId!: number;

  @BelongsTo(() => Client)
  client!: Client;

  @HasMany(() => AccountTransaction, { onDelete: "CASCADE" })
  accountTransactions!: AccountTransaction[];

  async initialize(clients: Client[]): Promise<BankAccount[]> {
    let bankAccountValues: BankAccountAttributes[] = [];
    for (const client of clients) {
      bankAccountValues.push({
        balance: 1000,
        clientId: client.id,
        departmentIdWhereOpen: client.departmentId,
      });
    }
    return await BankAccount.bulkCreate(bankAccountValues);
  }
}

export const BankAccountController = new BankAccount()
