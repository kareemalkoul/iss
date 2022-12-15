import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    HasMany,
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import { Config } from "../utils/config";
import { Contact } from "./contact.model";
import { Chat } from "./chat.model";

@Table({ tableName: "user" })
export class User extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    user_name!: string;

    @Column({ unique: true })
    phone!: string;


    @Column
    set password(password: string) {
        let hash = bcrypt.hashSync(password, Config.bcryptConfig.saltKey);
        this.setDataValue("password", hash);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.getDataValue("password"));
    }

    @HasMany(() => Chat, "user1_id")
    chat_user1_id!: Chat[]

    @HasMany(() => Chat, "user2_id")
    chat_user2_id!: Chat[]

    @HasMany(() => Contact)
    contacts!: Contact[]
}
