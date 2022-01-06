import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import useLocalStorage from "./hooks/useLocalStorage";
import useFilter from "./hooks/useFilter";

function App() {
  const [contacts, setContacts] = useLocalStorage();
  const [filter, updateFilter, getFilteredContacs] = useFilter();

  const addNewContact = (name, number) => {
    if (contacts.find((el) => el.name === name)) {
      return toast.info(`${name} is already in contacts`);
    }
    setContacts([...contacts, { id: nanoid(), name, number }]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((el) => el.id !== id));
  };

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
