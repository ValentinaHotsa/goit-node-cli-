const fs = require("fs/promises");
const path = require("path");
const contactPath = path.join(__dirname, "./db/contacts.json");
async function listContacts() {
  const allContacts = await fs.readFile(contactPath);
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactbyId = contacts.find((contact) => contact.id === contactId);
  return contactbyId || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deleteContact] = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null));

  return deleteContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
