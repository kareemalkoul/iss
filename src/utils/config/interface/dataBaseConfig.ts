import { DataBaseServerType } from "../../types/database.type";


interface DataBaseConfig {
    Host: string;
    Port: number;
    Name: string;
    UserName: string;
    Password: string;
    ServerType: DataBaseServerType;
    Sync: boolean;
}

export { DataBaseConfig }