const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const buffer = await fs.readFile(contactsPath, 'utf-8');
  const contacts = await JSON.parse(buffer);
  return contacts;
};

async function getContactById(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) return null;

  return contacts[index];
};

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) return null;

  const removedContact = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;

};

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {id: nanoid(), name, email, phone };
  const newList = [...contacts, newContact];
  fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};