import { Op } from "sequelize";
import { CreateChat } from "../../entities/chat/chat.create";
import { Chat } from "../../models/chat.model";
import { ChatRepo } from "./interface";

class ChatRepoImp implements ChatRepo {
    private static instance: ChatRepoImp;
    public static get Instance(): ChatRepoImp {
        if (!ChatRepoImp.instance) {
            ChatRepoImp.instance = new ChatRepoImp();
        }
        return ChatRepoImp.instance;
    }

    constructor() {

    }

    async findAll(user_id: number): Promise<Chat[]> {
        return Chat.findAll({
            where: {
                [Op.or]: [
                    { user1_id: user_id },
                    { user2_id: user_id }
                ]
            }
        });
    }

    async findByPk(id: number): Promise<Chat | null> {
        return Chat.findByPk(id);
    }

    async findOne(user1_id: number, user2_id: number): Promise<Chat | null> {
        return Chat.findOne({
            where: { [Op.or]: [
                { user1_id: user1_id , user2_id: user2_id },
                { user1_id: user2_id , user2_id: user1_id },
            ] }
        });
    }

    async create(chat: CreateChat): Promise<Chat> {
        return Chat.create(chat);
    }

}

const chatRepoImp = ChatRepoImp.Instance

export { chatRepoImp };


