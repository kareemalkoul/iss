import { ChatEntity } from "../../entities/chat/chat"
import { CreateChat } from "../../entities/chat/chat.create"


export interface ChatRepo {
    findOne(id: number): Promise<ChatEntity | null>
    findAll(user_id: number): Promise<ChatEntity[]>
    create(chat: CreateChat): Promise<ChatEntity>
}