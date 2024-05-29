import { getAllContacts, getContactById } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
      ststus: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  };

  export const getContactByIdController = async (req, res) => {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: `Contact with id ${contactId} not found!`,
      });
    }

    res.json({
      ststus: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  }