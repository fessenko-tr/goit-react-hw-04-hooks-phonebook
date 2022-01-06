import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./ContactForm.module.css";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  static propTypes = {
    addNewContact: PropTypes.func.isRequired,
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState(() => ({ [name]: value }));
  };

  submitNewContact = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.addNewContact(name, number);
    this.clearForm();
  };

  clearForm = () => {
    this.setState(() => ({ name: "", number: "" }));
  };

  render() {
    return (
      <form onSubmit={this.submitNewContact} className={s.form}>
        <label className={s.label} htmlFor="name">
          Name
        </label>
        <input
          className={s.input}
          type="text"
          name="name"
          id="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label className={s.label} htmlFor="number">
          Number
        </label>
        <input
          className={s.input}
          type="tel"
          name="number"
          id="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={this.state.number}
          onChange={this.handleChange}
        />

        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
