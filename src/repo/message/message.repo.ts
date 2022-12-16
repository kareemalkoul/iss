import { MessageEntity } from "../../entities/message/message";
import { MessageInfo } from "../../entities/message/message.create";
import { Message } from "../../models/message.model";
import { MessageRepo } from "./interface";

class MessageRepoImp implements MessageRepo {
    private static instance: MessageRepoImp;
    public static get Instance(): MessageRepoImp {
        if (!MessageRepoImp.instance) {
            MessageRepoImp.instance = new MessageRepoImp();
        }
        return MessageRepoImp.instance;
    }

    constructor() {

    }

    async create(message: MessageInfo): Promise<MessageEntity> {
        return Message.create(message);
    }

    async findAll(chat_id: number): Promise<MessageEntity[]> {
        return Message.findAll({ where: { chat_id: chat_id } });
    }


}

const messageRepoImp = MessageRepoImp.Instance

export { messageRepoImp };


