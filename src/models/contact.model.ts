import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
@Table({ tableName: "contact" })
export class Contact extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column
    name!: string;

    @ForeignKey(() => User)
    @Column({ allowNull: false })
    user_id!: number;

    @Column({ unique: true })
    phone!: string;

    @BelongsTo(() => User)
    contact!: User

}
