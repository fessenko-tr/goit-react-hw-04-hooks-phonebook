import useLocalStorage from "./useLocalStorage";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

function useContacts() {
  const [contacts, setContacts] = useLocalStorage("contacts");

  const addNewContact = (name, number) => {
    if (contacts.find((el) => el.name === name)) {
      return toast.info(`${name} is already in contacts`);
    }
    setContacts([...contacts, { id: nanoid(), name, number }]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((el) => el.id !== id));
  };

  return [contacts, addNewContact, deleteContact];
}

export default useContacts;
