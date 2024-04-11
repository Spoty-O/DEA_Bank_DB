import { AllowNull, Column, HasMany, Model, Table, DataType } from "sequelize-typescript";
import { Replication } from "./Replication.js";

export interface DepartmentAttributes {
  address: string;
  city: string;
  phone: string;
}

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

  @HasMany(() => Replication, { onDelete: "CASCADE" })
  replications!: Replication[];
}
