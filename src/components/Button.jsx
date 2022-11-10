import React from "react";
import PropTypes from "prop-types";

const BUTTON_THEME = {
  blue: 'btn btn-primary me-2',
  grey: 'btn btn-secondary me-2',
  green: 'btn btn-success me-2',
  red: 'btn btn-danger me-2',
  black: 'btn btn-dark me-2',
  white: 'btn btn-light me-2',
}

function Button ({ children, theme="blue", buttonOptions }) {
  return (
    <button className={`${BUTTON_THEME[theme]}`} {...buttonOptions}>{children}</button>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  theme: PropTypes.string,
  buttonOptions: PropTypes.object.isRequired,
}

export default Button;
