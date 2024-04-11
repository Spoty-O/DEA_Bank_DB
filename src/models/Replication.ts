import { AllowNull, Column, Model, Table, DataType, ForeignKey } from "sequelize-typescript";
import { Client } from "./Client.js";
import { Department } from "./Department.js";

interface ReplicationAttributes {
  clientId: string; // hash id
  departmentId: number;
}

@Table({
  timestamps: false,
})
export class Replication extends Model<ReplicationAttributes> {
  @ForeignKey(() => Client)
  @AllowNull(false)
  @Column(DataType.STRING(40))
  clientId!: string;

  @ForeignKey(() => Department)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  departmentId!: number;
}
