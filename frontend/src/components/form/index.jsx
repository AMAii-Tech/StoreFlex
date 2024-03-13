import React from 'react';
import PropTypes from 'prop-types';

import StringField from './TextField';

const fieldMappers = {
  string: StringField,
};

const FormComponent = ({ columns, onChange, formValues }) => (
  <>
    {columns?.map((ele) => {
      const { type = 'string', headerName, field } = ele;
      const FieldComponent = fieldMappers.string;
      return (
        <FieldComponent
          key={field}
          name={field}
          type={type}
          label={headerName}
          value={formValues[field] || ''}
          onChange={onChange}
        />
      );
    })}
  </>
);

FormComponent.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  formValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormComponent;
