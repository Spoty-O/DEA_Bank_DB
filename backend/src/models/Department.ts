import { AllowNull, Column, Model, Table, DataType, Default, BelongsToMany } from "sequelize-typescript";
import { Replication } from "./Replication.js";
import { DepartmentAttributes } from "../types/types.js";

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

  @AllowNull(false)
  @Column(DataType.STRING(100))
  domain!: string;

  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  APIKey!: string;

  @BelongsToMany(() => Department, () => Replication, 'recipientDepartmentId')
  recipientReplications!: Department[];

  @BelongsToMany(() => Department, () => Replication, 'donorDepartmentId' )
  donorReplications!: Department[];
}
