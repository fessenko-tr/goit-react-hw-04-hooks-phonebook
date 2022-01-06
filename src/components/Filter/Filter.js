import PropTypes from "prop-types";
import s from "./Filter.module.css";

function Filter({ value, updateFilterFunc }) {
  return (
    <>
      <label className={s.label} htmlFor="filter">
        Find contacts by name
      </label>
      <input
        className={s.input}
        id="filter"
        value={value}
        onChange={updateFilterFunc}
      />
    </>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  updateFilterFunc: PropTypes.func.isRequired,
};

export default Filter;
