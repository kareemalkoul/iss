import { Sequelize, Model, Table, Column, PrimaryKey, AutoIncrement } from "sequelize-typescript"

@Table
export class User extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    userName!: string;

    @Column({ unique: true })
    phone!: string;

    @Column
    password!: string;


}