import { ChatEntity } from "../../entities/chat/chat";
import { CreateChat } from "../../entities/chat/chat.create";
import { MessageInfo } from "../../entities/chat/chat.message";
import { MessageEntity } from "../../entities/message/message";
import { chatRepoImp } from "../../repo/chat/chat.repo";
import { ChatRepo } from "../../repo/chat/interface";
import { MessageRepo } from "../../repo/message/interface";
import { messageRepoImp } from "../../repo/message/message.repo";

export class ChatService {
    private static instance: ChatService;

    public static get Instance(): ChatService {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService(chatRepoImp, messageRepoImp);
        }
        return ChatService.instance;
    }

    private constructor(private readonly chatRepo: ChatRepo ,
        private readonly messageRepo: MessageRepo ) {

    }

    async getChats(user_id: number): Promise<ChatEntity[]> {
        const chats = await this.chatRepo.findAll(user_id);
        return chats;
    }

    async getChatHistory(id: number): Promise<MessageEntity[]> {
        const chat = await this.chatRepo.findOne(id);
        if (!chat)
            throw Error(`not found chat ${id}`);
        return this.messageRepo.findAll(id);
    }

    async createChat(createChat: CreateChat): Promise<ChatEntity> {
        return this.chatRepo.create(createChat);
    }

    async sendMessage(messageInfo: MessageInfo): Promise<MessageEntity> {
        const chat = await this.chatRepo.findOne(messageInfo.chat_id);
        if (!chat)
            throw Error(`not found chat ${messageInfo.chat_id}`);
        const message = await this.messageRepo.create(messageInfo);
        return message;
    }

}

const chatService = ChatService.Instance

export { chatService };

