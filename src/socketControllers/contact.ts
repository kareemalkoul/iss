import { Server } from "socket.io";
import { ContactCreate } from "../entities/contact/contact.create";
import { userService } from "../services/user/user";
import { emitChat } from "./assets/emit";

export const addContact = (ioSocket: Server) => async (data: any) => {

    const user_id = data.user.id;
    const phone = data.phone;
    const name = data.name;
    const contact: ContactCreate = { user_id, phone, name };
    const instance = await userService.addContact(contact);
    emitChat(instance, "addContact", ioSocket);

}

export const getContacts = (ioSocket: Server) => async (data: any) => {

    const user_id = data.user.id;
    const contacts = await userService.getContacts(user_id);
    emitChat(contacts, "addContact", ioSocket);

}
