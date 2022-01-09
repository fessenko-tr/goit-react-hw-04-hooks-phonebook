import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import useFilter from "./hooks/useFilter";
import useContacts from "./hooks/useContacts";

function App() {
  const [contacts, addNewContact, deleteContact] = useContacts();
  const [filter, updateFilter, getFilteredContacs] = useFilter();

  const contactsToShow = getFilteredContacs(contacts);
  const noContactsAdded = "You seem not to have any contacts yet";

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addNewContact={addNewContact} />
      <h2>Contacts</h2>
      {contacts.length ? (
        <>
          <Filter value={filter} updateFilterFunc={updateFilter} />
          <ContactList
            contactsList={contactsToShow}
            deleteContactBtn={deleteContact}
          />
        </>
      ) : (
        <Notification msg={noContactsAdded} />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
