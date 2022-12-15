import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import { Chat } from "./chat.model";
@Table({ tableName: "message" })
export class Message extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @ForeignKey(() => Chat)
    @Column
    chat_id!: number;

    @Column({ allowNull: false })
    text!: string

    @Column({ defaultValue: false })
    is_read!: boolean

    @BelongsTo(() => Chat)
    chat_user2_id!: Chat[]

}
