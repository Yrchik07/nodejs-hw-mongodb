import { Router } from 'express';
import { validateMongoid } from '../middlewares/validateMongoid.js';
import {
  createContactController,
  deleteContactIdController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  putContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();
const getContactsHandler = ctrlWrapper(getContactsController);
const getContactByIdHandler = ctrlWrapper(getContactByIdController);
const createContactsHandler = ctrlWrapper(createContactController);
const patchContactsHandler = ctrlWrapper(patchContactController);
const putContactsHandler = ctrlWrapper(putContactController);
const deleteContactsByIdHandler = ctrlWrapper(deleteContactIdController);

contactsRouter.use('/:contactId', validateMongoid('contactId'));

contactsRouter.use('/', authenticate);

contactsRouter.get('/', getContactsHandler);

contactsRouter.get('/:contactId', getContactByIdHandler);

contactsRouter.post('/', validateBody(createContactSchema), createContactsHandler);

contactsRouter.patch('/:contactId', validateBody(updateContactSchema), patchContactsHandler);

contactsRouter.put('/:contactId', validateBody(createContactSchema), putContactsHandler);

contactsRouter.delete('/:contactId', deleteContactsByIdHandler);

export default contactsRouter;
