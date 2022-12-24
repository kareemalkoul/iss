import { ContactCreate } from "../../entities/contact/contact.create";
import { contactEntity } from "../../entities/contact/contact";

export interface ContactRepo {
    create(contact: ContactCreate): Promise<contactEntity>;
    findAll(user_id: number): Promise<contactEntity[]>;
    findOne(id: number): Promise<contactEntity | null>
}
