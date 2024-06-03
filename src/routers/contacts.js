import { Router } from 'express';
import {
  createContactController,
  deleteContactIdController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';

const contactRouter = Router();
const getContactsHandler = ctrlWrapper(getContactsController);
const getContactByIdHandler = ctrlWrapper(getContactByIdController);
const createContactsHandler = ctrlWrapper(createContactController);
const patchContactsHandler = ctrlWrapper(patchContactController);
const deleteContactsByIdHandler = ctrlWrapper(deleteContactIdController);

contactRouter.get('/contacts', getContactsHandler);

contactRouter.get('/contacts/:contactId', getContactByIdHandler);

contactRouter.post('/contacts', createContactsHandler);

contactRouter.patch('/contacts/:contactId', patchContactsHandler);

contactRouter.delete('/contacts/:contactId', deleteContactsByIdHandler);

export default contactRouter;
