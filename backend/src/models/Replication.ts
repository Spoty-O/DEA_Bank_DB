import { AllowNull, Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Client } from "./Client.js";
import { Department } from "./Department.js";
import { BelongsToGetAssociationMixin } from "sequelize";
import { ReplicationAttributes } from "../types/types.js";

@Table({
  timestamps: false,
})
export class Replication extends Model<ReplicationAttributes> {
  @ForeignKey(() => Client)
  @AllowNull(false)
  @Column(DataType.UUID)
  clientId!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  lastName!: string;

  @ForeignKey(() => Department)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  recipientDepartmentId!: number;

  @ForeignKey(() => Department)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  donorDepartmentId!: number;

  @BelongsTo(() => Department)
  department!: Department;

  getDepartment!: BelongsToGetAssociationMixin<Department>;
}
