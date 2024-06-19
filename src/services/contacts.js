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
  const contactFilter = Contact.find();
  if (filter.type) {
    contactFilter.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactFilter.where('isFavourite').equals(filter.isFavourite);
  }
  contactFilter.where('parentId').equals(userId);

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

export const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw createHttpError(404, `Contact not found!`);
  }
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await Contact.create({...payload, parentId: userId});
  return contact;
};

export const upsertContact = async (id, payload, options = {}) => {
  const rawResult = await Contact.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!rawResult || !rawResult.value) {
    throw createHttpError(404, `Contact with id ${id} not found!`);
  }

  return {
    contact: rawResult.value,
    isNew: !rawResult?.lastErrorObject?.updatedExisting,
  };
};

export const deleteContactById = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  return result;
};
