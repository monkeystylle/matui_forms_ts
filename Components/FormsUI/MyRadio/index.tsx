import React from 'react';
import { Radio, FormControlLabel } from '@material-ui/core';
import { useField } from 'formik';

interface MyRadioProps {
  name: string;
  value: string;
  label: string;
}

const MyRadio = (props: MyRadioProps) => {
  const [field] = useField({
    name: props.name,
    type: 'radio',
    value: props.value,
  });

  return (
    <FormControlLabel
      value={props.value}
      control={<Radio {...props} {...field} />}
      label={props.label}
    />
  );
};

export default MyRadio;
