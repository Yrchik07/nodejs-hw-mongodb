import { Router } from "express";
import { getAllContacts, getContactById } from "../services/contacts.js";
import { getContactByIdController, getContactsController } from "../controllers/contacts.js";

const contactRouter = Router();

contactRouter.get('/contacts', getContactsController);

  contactRouter.get('/contacts/:contactId', getContactByIdController);

  export default contactRouter;