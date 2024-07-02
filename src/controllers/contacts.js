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

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = req.query;
    // const filter = { ...parseFilters(req.query), userId: req.user._id };
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
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const userId = req.user._id;
    const contact = await getContactById(contactId, userId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found or you are not authorized to view it');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { body, file } = req;
    if (!file) {
      throw new Error('File is not provided or failed to upload');
    }
    const contact = await createContact({...body, avatar: file}, req.user._id);

    res.status(201).json({
      status: 201,
      message: 'Successfully created contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;
    const userId = req.user._id;
    const {contact} = await upsertContact(contactId, body, userId, {

    });

    if (!contact) {
      throw createHttpError(404, 'Contact not found or you are not authorized to update it');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const putContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;
    const userId = req.user._id;
    const { isNew, contact } = await upsertContact(contactId, body, userId, {
      upsert: true,
    });

    if (!contact) {
      throw createHttpError(404, 'Contact not found or you are not authorized to update it');
    }

    const status = isNew ? 201 : 200;

    res.status(status).json({
      status,
      message: 'Successfully upserted contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactIdController = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const userId = req.user._id;
    const contact = await deleteContactById(contactId, userId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found or you are not authorized to delete it');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};