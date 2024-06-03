import createHttpError from 'http-errors';
import { Contact } from '../db/models/сontact.js';

export const getAllContacts = async () => {
   return await Contact.find();
};

export const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if(!contact) {
    throw createHttpError(404, `Contact with id ${id} not found!`);
  }
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const upsertContact = async (id, payload) => {
const contact = await Contact.findByIdAndUpdate(id, payload, {new: true});
return contact;
};


export const deleteContactById = async (contactId) => {
await Contact.findByIdAndDelete(contactId);
};
