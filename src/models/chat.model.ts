import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
} from "sequelize-typescript";

import { User } from "./user.model";
@Table
export class Chat extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @ForeignKey(() => User)
    @Column
    user1_id!: string;

    @ForeignKey(() => User)
    @Column
    user2_id!: string;

}
