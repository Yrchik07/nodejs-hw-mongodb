import createHttpError from 'http-errors';
import { Contact } from '../db/models/сontact.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const contactFilter = Contact.find({ userId });

  if (filter.type) {
    contactFilter.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactFilter.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactCount, contacts] = await Promise.all([
    Contact.find().merge(contactFilter).countDocuments(),
    Contact.find()
      .merge(contactFilter)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    contactCount,
  );

  return {
    data: contacts,
    page,
    perPage,
    ...paginationInformation,
  };
};

export const getContactById = async (id, userId) => {
  const contact = await Contact.findOne({ _id: id, userId });

  if (!contact) {
    throw createHttpError(404, 'Contact not found or you are not authorized to view it');
  }

  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await Contact.create({...payload,  userId });
  return contact;
};

export const upsertContact = async (id, payload, userId, options = {}) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!contact || !contact.value) {
    throw createHttpError(404, 'Contact not found or you are not authorized to update it');
  }

  return {
    contact: contact.value,
    isNew: !contact?.lastErrorObject?.updatedExisting,
  };
};

export const deleteContactById = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });

  if (!contact) {
    throw createHttpError(404, 'Contact not found or you are not authorized to delete it');
  }

  return contact;
};
