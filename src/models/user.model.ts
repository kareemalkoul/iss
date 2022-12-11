import {
    Sequelize,
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import { Config } from "../utils/config";

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

    // @Column
    // password!: string;

    @Column
    set password(password: string) {
        let hash = bcrypt.hashSync(password, Config.bcryptConfig.saltKey);
        this.setDataValue("password", hash);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.getDataValue("password"));
    }
}
