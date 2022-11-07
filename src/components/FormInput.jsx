import React from "react";
import { FormControl } from "react-bootstrap";

function FormInput({ label, inputOptions }) {
  return (
    <>
      <label htmlFor={inputOptions.id} className="fs-5">{label}</label>
      <FormControl className="form-input mb-2" {...inputOptions} autoComplete="off" />
    </>
  )
}

export default FormInput;
