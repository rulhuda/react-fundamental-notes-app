import React, { useContext } from "react";
import { FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import ThemeContext from "../contexts/ThemeContext";

function FormInput({ label, inputOptions }) {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <label
        htmlFor={inputOptions.id}
        className={`fs-5 ${theme === "light" ? "text-dark" : "text-white"}`}
      >
        {label}
      </label>
      <FormControl
        style={{
          "::placeholder": `${theme === "light" ? "black" : "white"}`,
        }}
        className={`form-input mb-2 ${
          theme === "light" ? "text-dark" : "text-white"
        }`}
        {...inputOptions}
        autoComplete='off'
      />
    </>
  );
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  inputOptions: PropTypes.object.isRequired,
};

export default FormInput;
