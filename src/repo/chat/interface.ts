import { ChatEntity } from "../../entities/chat/chat"
import { CreateChat } from "../../entities/chat/chat.create"


export interface ChatRepo {
    findByPk(id: number): Promise<ChatEntity | null>
    findOne(user1_id: number, user2_id: number): Promise<ChatEntity | null>
    findAll(user_id: number): Promise<ChatEntity[]>
    create(chat: CreateChat): Promise<ChatEntity>
}