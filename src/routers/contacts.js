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

const contactRouter = Router();
const getContactsHandler = ctrlWrapper(getContactsController);
const getContactByIdHandler = ctrlWrapper(getContactByIdController);
const createContactsHandler = ctrlWrapper(createContactController);
const patchContactsHandler = ctrlWrapper(patchContactController);
const putContactsHandler = ctrlWrapper(putContactController);
const deleteContactsByIdHandler = ctrlWrapper(deleteContactIdController);

contactRouter.use('/contacts/:contactId', validateMongoid('contactId'));

contactRouter.get('/contacts', getContactsHandler);

contactRouter.get('/contacts/:contactId', getContactByIdHandler);

contactRouter.post('/contacts', validateBody(createContactSchema), createContactsHandler);

contactRouter.patch('/contacts/:contactId', validateBody(updateContactSchema), patchContactsHandler);

contactRouter.put('/contacts/:contactId', validateBody(createContactSchema), putContactsHandler);

contactRouter.delete('/contacts/:contactId', deleteContactsByIdHandler);

export default contactRouter;
