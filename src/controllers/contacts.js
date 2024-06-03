import { createContact, deleteContactById, getAllContacts, getContactById, upsertContact } from "../services/contacts.js";

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

    res.json({
      ststus: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  };

  export const createContactController = async (req, res) => {
    const {body} = req;
    const contact = await createContact(body);

    res.status(201).json({
      ststus: 201,
      message: `Successfully created contact!`,
      data: contact,
    });
  };

  export const patchContactController = async (req, res) => {
    const {body} = req;
    const {contactId} = req.params;
    const contact = await upsertContact(contactId, body);

    res.status(200).json({
      ststus: 200,
      message: `Successfully patched contact!`,
      data: contact,
    });
  };

  export const deleteContactIdController = async (req, res) => {
    const contactId = req.params.contactId;
    await deleteContactById(contactId);

    res.status(204).send();
  };