import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';

const StringField = ({ name, type, label, value, onChange }) => (
  <TextField
    key={name}
    type={type}
    name={name}
    className="form-text-field"
    required
    id="outlined-required"
    label={label}
    sx={{ width: 500, m: 1 }}
    defaultValue={value}
    onChange={onChange}
  />
);

StringField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func,
};

export default StringField;
