import React from 'react';
import { CheckboxProps, Checkbox, FormControlLabel } from '@material-ui/core';
import { useField } from 'formik';

interface MyCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

const MyCheckBox = (props: MyCheckboxProps) => {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value,
  });
  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
};

export default MyCheckBox;
