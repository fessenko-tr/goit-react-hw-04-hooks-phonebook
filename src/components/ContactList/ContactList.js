import Contact from "../Contact";
import PropTypes from "prop-types";

function ContactList({ contactsList, deleteContactBtn }) {
  const contacts = contactsList.map(({ id, name, number }) => (
    <Contact
      key={id}
      id={id}
      name={name}
      number={number}
      deleteFunction={deleteContactBtn}
    />
  ));

  return <ul>{contacts}</ul>;
}

ContactList.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContactBtn: PropTypes.func.isRequired,
};

export default ContactList;
