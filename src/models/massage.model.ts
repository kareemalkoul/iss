import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
} from "sequelize-typescript";

import { Chat } from "./chat.model";
@Table
export class Message extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @ForeignKey(() => Chat)
    @Column
    chat_id!: string;

    @Column
    text!: string
    
    @Column
    is_read!: boolean
}
