import dotenv from "dotenv";
const envPath = process.cwd() + "\\.env";
dotenv.config({ path: envPath });
import config from 'config';
import { DataBaseConfig } from "./interface/dataBaseConfig";
import { ServerConfig } from "./interface/serverConfig";

class Config {
    private static instance: Config;
    public static get Instance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    server: ServerConfig;
    dataBase: DataBaseConfig;
    constructor() {
        this.server = {
            Port: config.get("port"),
            Mode: config.get("name")
        }

        this.dataBase = {
            Host: config.get("db.host"),
            Port: config.get("db.port"),
            Name: config.get("db.data_base"),
            UserName: config.get("db.user"),
            Password: config.get("db.password"),
            ServerType: config.get("db.type"),
            Sync: config.get("db.sync")
        }
    }



}

const instance = Config.Instance;
export { instance as Config };
