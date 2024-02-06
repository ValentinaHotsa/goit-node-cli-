// import { constants } from "buffer";
// const { program } = require("commander");
const program = require("./node_modules/commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
// import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      const contacts = await listContacts();
      return console.table(contacts);
      break;

    case "get":
      // ... id
      const contactId = await getContactById(id);
      return console.log(contactId);
      break;

    case "add":
      // ... name email phone
      const addedContact = await addContact(name, email, phone);

      return console.log(addedContact);

      break;

    case "remove":
      // ... id
      const deletedContact = await removeContact(id);
      return console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
