import { AllowNull, Column, HasMany, Model, Table, DataType, Default } from "sequelize-typescript";
import { Replication } from "./Replication.js";
import { DepartmentAttributes, DepartmentCreationAttributes } from "../types/types.js";

@Table({
  timestamps: false,
})
export class Department extends Model<DepartmentAttributes, DepartmentCreationAttributes> {
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

  @HasMany(() => Replication, { onDelete: "CASCADE" })
  replications!: Replication[];
}
