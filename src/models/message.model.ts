import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

import CryptoJS from "crypto-js"


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

    @Column({
        allowNull: false,
        get(this) {
            const text = this.getDataValue("text") ?? ""
            var decrypted = CryptoJS.AES.decrypt(text, "WERTYKDF34BSJ");
            return decrypted.toString(CryptoJS.enc.Utf8);
        },
        set(text: string) {
            var encrypted = CryptoJS.AES.encrypt(text, "WERTYKDF34BSJ");
            this.setDataValue("text", encrypted.toString())
        }
    })
    text!: string


    @Column({ defaultValue: false })
    is_read!: boolean

    @BelongsTo(() => Chat)
    chat_user2_id!: Chat[]

}
