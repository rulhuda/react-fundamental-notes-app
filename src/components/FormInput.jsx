import React from "react";
import { FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

function FormInput({ label, inputOptions }) {
  return (
    <>
      <label htmlFor={inputOptions.id} className="fs-5">{label}</label>
      <FormControl className="form-input mb-2" {...inputOptions} autoComplete="off" />
    </>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  inputOptions: PropTypes.object.isRequired,
}

export default FormInput;
