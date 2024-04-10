import { AllowNull, Column, Model, Table, DataType, ForeignKey } from "sequelize-typescript";
import { Department } from "./Departments.js";

interface ReplicationAttributes {
  userId: string; // hash id
  departmentId: number;
}

@Table({
  timestamps: false,
})
export class Replication extends Model<ReplicationAttributes> {
  @ForeignKey(() => Department)
  @AllowNull(false)
  @Column(DataType.STRING(255))
  userId!: string;

  @ForeignKey(() => Department)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  departmentId!: number;
}
