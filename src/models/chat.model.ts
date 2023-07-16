import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import { Message } from "./message.model";

import { User } from "./user.model";
@Table({ tableName: "chat" })
export class Chat extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => User)
    @Column({ allowNull: false })
    user1_id!: number;

    @ForeignKey(() => User)
    @Column({ allowNull: false })
    user2_id!: number;

    @BelongsTo(() => User, { foreignKey: "user1_id" })
    chat_user1_id!: User

    @BelongsTo(() => User, { foreignKey: "user2_id" })
    chat_user2_id!: User

    @HasMany(() => Message)
    messages!: Message[]

}
