import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
} from "sequelize-typescript";
@Table
export class Contact extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @Column({ unique: true })
    phone!: string;
}
