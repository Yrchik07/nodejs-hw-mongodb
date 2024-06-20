import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  upsertContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilters } from '../utils/parseFilters.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = req.query;
  const filter = parseFilters(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
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
  const { body } = req;
  const contact = await createContact(body, req.user._id);

  res.status(201).json({
    ststus: 201,
    message: `Successfully registered a user!`,
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const { contact } = await upsertContact(contactId, body);

  res.status(200).json({
    ststus: 200,
    message: `Successfully patched contact!`,
    data: contact,
  });
};

export const putContactController = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const { isNew, contact } = await upsertContact(contactId, body, {
    upsert: true,
  });
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted contact!`,
    data: contact,
  });
};

export const deleteContactIdController = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await deleteContactById(contactId);
    if (!contact) {
      const error = createHttpError(404, 'Contact not found');
      error.data = { message: 'Contact not found' };
      throw error;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
