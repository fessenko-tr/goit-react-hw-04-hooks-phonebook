import React, { useReducer } from "react";
import PropTypes from "prop-types";
import s from "./ContactForm.module.css";
import initialState from "./initialState";

function ContactForm({ addNewContact }) {
  const [state, dispatch] = useReducer(handleChange, initialState);

  function handleChange(state, action) {
    const { option, value } = action;

    if (option === "reset") {
      return initialState;
    }

    return { ...state, [option]: value };
  }

  function submitNewContact(e) {
    e.preventDefault();
    addNewContact(state.name, state.number);
    dispatch({ option: "reset" });
  }

  return (
    <form onSubmit={submitNewContact} className={s.form}>
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
        value={state.name}
        onChange={(e) => {
          const { name, value } = e.currentTarget;
          dispatch({ option: name, value });
        }}
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
        value={state.number}
        onChange={(e) => {
          const { name, value } = e.currentTarget;
          dispatch({ option: name, value });
        }}
      />

      <button type="submit">Add contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  addNewContact: PropTypes.func.isRequired,
};

export default ContactForm;
