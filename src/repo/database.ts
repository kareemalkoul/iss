import { Sequelize } from 'sequelize-typescript'
import { Config } from "../utils/config";
import { User } from "../models/user.model";
import { Contact } from '../models/contact.model';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';

module database {

    const sequelize = new Sequelize(
        {
            database: Config.dataBase.Name,
            dialect: Config.dataBase.ServerType,
            host: Config.dataBase.Host,
            username: Config.dataBase.UserName,
            password: Config.dataBase.Password,
            port: Config.dataBase.Port,
            logging: false,
            dialectOptions: {
                multipleStatements: true,
            },
            define: {
                freezeTableName: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            }
        }
    );

    sequelize.addModels([Contact, User, Chat, Message]);

    (async () => {
        try {
            await sequelize.authenticate();

        } catch (error) {

        }
    })();

    sequelize.sync();

}




export { database };
