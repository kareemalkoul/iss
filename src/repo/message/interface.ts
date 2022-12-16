import { MessageEntity } from "../../entities/message/message";

export interface MessageRepo {
    create(message: MessageEntity): Promise<MessageEntity>
    findAll(chat_id: number): Promise<MessageEntity[]>
}