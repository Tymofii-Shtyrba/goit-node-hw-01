const argv = require('yargs').argv;
const contacts = require('./contacts');



async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const addedContact = await contacts.addContact(name, email, phone);
      console.log(addedContact);
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);