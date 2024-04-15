import { AllowNull, Column, HasMany, Model, Table, DataType } from "sequelize-typescript";
import { Replication } from "./Replication.js";
import { Optional } from "sequelize";
import { DepartmentAttributes } from "../types/types.js";

export interface DepartmentCreationAttributes extends Optional<DepartmentAttributes, "id"> {}

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

  @HasMany(() => Replication, { onDelete: "CASCADE" })
  replications!: Replication[];
}
