import { Server } from "socket.io";
import { ContactCreate } from "../entities/contact/contact.create";
import { userService } from "../services/user/user";
import { emitChat } from "./assets/emit";
import { contactEntity } from "../entities/contact/contact";
import { socket } from "../socket";

export const addContact = (ioSocket: Server) => async (data: any) => {

    const user_id = data.user_id;
    const phone = data.phone;
    const name = data.name;
    console.log(data);

    const contact: ContactCreate = { user_id, phone, name };
    const instance = await userService.addContact(contact);
    console.log(instance);

    ioSocket.sockets.emit("contact_added", instance);

    // emitChat(instance, "addContact", ioSocket);

}

export const getContacts = (ioSocket: Server) => async (data: any) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    const user_id = data.user_id;
    var contacts: contactEntity[] = await userService.getContacts(user_id);
    interface IKeys { phone: string; name: string }
    var c = contacts.map(c => <IKeys>{ phone: c.phone, name: c.name })
    // console.log(c);

    const userContact = socket.users.find(user => user.phone == data.phone)

    ioSocket.sockets.to(userContact!.soketId).emit("myContacts", c);

    // emitChat(contacts, "addContact", ioSocket);

}
