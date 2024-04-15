import { AllowNull, Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Client } from "./Client.js";
import { Department } from "./Department.js";
import { BelongsToGetAssociationMixin, Optional } from "sequelize";
import { ReplicationAttributes } from "../types/types.js";

export interface ReplicationCreationAttributes extends Optional<ReplicationAttributes, "id"> {}

@Table({
  timestamps: false,
})
export class Replication extends Model<ReplicationAttributes, ReplicationCreationAttributes> {
  @ForeignKey(() => Client)
  @AllowNull(false)
  @Column(DataType.STRING(40))
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
  departmentId!: number;

  @BelongsTo(() => Department)
  department!: Department;

  getDepartment!: BelongsToGetAssociationMixin<Department>;
}
