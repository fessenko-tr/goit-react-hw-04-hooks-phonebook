import "./App.css";
import React, { Component } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { nanoid } from "nanoid";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    this.setState(() => {
      const loadedFromLocal = this.loadContactsFromLocalStorage();
      return { contacts: [...loadedFromLocal] };
    });
  }

  componentDidUpdate() {
    this.saveContactsToLocalStorage();
  }

  loadContactsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("contacts"));
  }
  saveContactsToLocalStorage = () => {
    const { contacts } = this.state;
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  addNewContact = (name, number) => {
    this.setState((current) => {
      const { contacts } = current;
      if (contacts.find((el) => el.name === name)) {
        alert(`${name} is already in contacts.`);
        return;
      }
      return {
        contacts: [...contacts, { id: nanoid(), name, number }],
      };
    });
  };

  deleteContact = (id) => {
    this.setState((current) => ({
      contacts: current.contacts.filter((el) => el.id !== id),
    }));
  };

  updateFilter = (e) => {
    const value = e.currentTarget.value;

    this.setState({ filter: value });
  };

  getFilteredContacs = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((e) => {
      return e.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  render() {
    const contactsToShow = this.getFilteredContacs();
    const { filter } = this.state;

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm addNewContact={this.addNewContact} />
        <h2>Contacts</h2>
        {contactsToShow.length ? (
          <>
            <Filter value={filter} updateFilterFunc={this.updateFilter} />
            <ContactList
              contactsList={contactsToShow}
              deleteContactBtn={this.deleteContact}
            />
          </>
        ) : (
          <Notification msg={"You seem not to have added any contacts yet!"} />
        )}
      </>
    );
  }
}

export default App;
