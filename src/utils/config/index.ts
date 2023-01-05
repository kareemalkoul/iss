import dotenv from "dotenv";
import bcrypt from "bcrypt";
const envPath = process.cwd() + "\\.env";
dotenv.config({ path: envPath });
import config from "config";
import { DataBaseConfig } from "./interface/dataBaseConfig";
import { ServerConfig } from "./interface/serverConfig";
import { BcryptConfig } from "./interface/bcryptConfig";
import { TokerConfig } from "./interface/tokenConifg"
import rsa from 'js-crypto-rsa'; // for npm
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
    bcryptConfig: BcryptConfig;
    tokerConfig: TokerConfig;
    publicKey!: JsonWebKey;
    privateKey!: JsonWebKey;
    constructor() {
        this.server = {
            Port: config.get("port"),
            Mode: config.get("name"),
        };

        this.dataBase = {
            Host: config.get("db.host"),
            Port: config.get("db.port"),
            Name: config.get("db.data_base"),
            UserName: config.get("db.user"),
            Password: config.get("db.password"),
            ServerType: config.get("db.type"),
            Sync: config.get("db.sync"),
        };
        let rounds = 10;
        this.bcryptConfig = {
            saltRounds: rounds,
            saltKey: bcrypt.genSaltSync(rounds),
        };

        this.tokerConfig = {
            SECRET_KEY: config.get("token.jwtScretKey"),
            EXPIRATION_DATE: config.get("token.expireIn")
        }
        rsa.generateKey(2048).then( (key) => {
            this.publicKey = key.publicKey;
            this.privateKey = key.privateKey;
    
        })
    }
}

const instance = Config.Instance;
export { instance as Config };
