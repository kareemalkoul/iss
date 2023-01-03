import { ChatEntity } from "../../entities/chat/chat";
import { CreateChat } from "../../entities/chat/chat.create";
import { MessageInfo } from "../../entities/chat/chat.message";
import { MessageEntity } from "../../entities/message/message";
import { chatRepoImp } from "../../repo/chat/chat.repo";
import { ChatRepo } from "../../repo/chat/interface";
import { MessageRepo } from "../../repo/message/interface";
import { messageRepoImp } from "../../repo/message/message.repo";
import { UserRepo } from "../../repo/user/interface";
import { userRepoImp } from "../../repo/user/user.repo";

export class ChatService {
    private static instance: ChatService;

    public static get Instance(): ChatService {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService(chatRepoImp, messageRepoImp, userRepoImp);
        }
        return ChatService.instance;
    }

    private constructor(
        private readonly chatRepo: ChatRepo,
        private readonly messageRepo: MessageRepo,
        private readonly userRepo: UserRepo) {

    }

    async getChats(user_id: number): Promise<ChatEntity[]> {
        const chats = await this.chatRepo.findAll(user_id);
        return chats;
    }

    async getChatHistory(chat_id: number): Promise<MessageEntity[]> {
        const chat = await this.chatRepo.findByPk(chat_id);
        if (!chat)
            throw Error(`not found chat ${chat_id}`);
        return this.messageRepo.findAll(chat_id);
    }

    async getChatByPhone(user1_id: number, phone: string): Promise<ChatEntity> {
        const user2 = await this.userRepo.findOne(phone);
        if (!user2) throw Error(`not found user with ${phone} number`);
        const user2_id = user2.id
        let chat = await this.chatRepo.findOne(user1_id, user2_id);
        if (!chat) {
            const createChat = { user1_id, user2_id }
            chat = await this.createChat(createChat)
        }
        return chat;

    }

    async createChat(createChat: CreateChat): Promise<ChatEntity> {
        return this.chatRepo.create(createChat);
    }

    async sendMessage(messageInfo: MessageInfo): Promise<MessageEntity> {
        const chat = await this.chatRepo.findByPk(messageInfo.chat_id);
        if (!chat)
            throw Error(`not found chat ${messageInfo.chat_id}`);
        const message = await this.messageRepo.create(messageInfo);
        return message;
    }

}

const chatService = ChatService.Instance

export { chatService };

