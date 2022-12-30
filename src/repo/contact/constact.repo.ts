import { Op } from "sequelize";
import { ContactCreate } from "../../entities/contact/contact.create";
import { Contact } from "../../models/contact.model";
import { ContactRepo } from "./interface";

class ContactRepoImp implements ContactRepo {
    private static instance: ContactRepoImp;
    public static get Instance(): ContactRepoImp {
        if (!ContactRepoImp.instance) {
            ContactRepoImp.instance = new ContactRepoImp();
        }
        return ContactRepoImp.instance;
    }

    constructor() {}

    async findAll(user_id: number): Promise<Contact[]> {
        return await Contact.findAll({
            where: {
                user_id: user_id,
            },
        });
    }

    async findOne(id: number): Promise<Contact | null> {
        return await Contact.findByPk(id);
    }

    async create(contact: ContactCreate): Promise<Contact> {
        return await Contact.create(contact);
    }
}

const contactRepoImp = ContactRepoImp.Instance;

export { contactRepoImp };
