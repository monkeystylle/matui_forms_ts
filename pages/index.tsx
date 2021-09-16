import React from 'react';
import { Box, Grid, Typography, TextField, MenuItem } from '@material-ui/core';
import { FormLabel, Button } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { string } from 'yup';

import MyCheckbox from '../Components/FormsUI/MyCheckbox';
import MyRadio from '../Components/FormsUI/MyRadio';

interface InvestmentDetails {
  // minChars = 2, maxChars = 30
  fullName: string;

  // initial investment, min=100 euros
  initialInvestment?: number;

  // investment risk the client wants to take
  // show 3 Checkboxes - "High", "Medium", "Low"
  // at least one is mandatory
  investmentRisk: Array<'High' | 'Medium' | 'Low'>;

  // this field is dependent on investmentRisk
  // It is mandatory only if the client selects
  // High investmentRisk
  // textarea = minChars = 20, max=100
  commentAboutInvestmentRisk: string;

  // select field starting with Select...
  // number of dependents is mandatory from 0 up to 5
  dependents?: number;

  // the user has to accept the terms and conditions
  acceptedTermsAndConditions: boolean;
  date: string;
  radio: string;
}

const initialValues: InvestmentDetails = {
  fullName: '',
  initialInvestment: 0,
  investmentRisk: [],
  commentAboutInvestmentRisk: '',
  dependents: 0,
  acceptedTermsAndConditions: false,
  date: '',
  radio: '',
};

const FORM_VALIDATION = Yup.object().shape({
  fullName: Yup.string().required('Required').min(2).max(30),
  dependents: Yup.number().required().min(0).max(5),
  acceptedTermsAndConditions: Yup.boolean()
    .oneOf([true], 'The Terms and conditions must be accepted')
    .required('The Terms and conditions must be accepted'),
  investmentRisk: Yup.array(string().oneOf(['High', 'Medium', 'Low'])).min(1),
  date: Yup.string().required('Date Required'),
  radio: Yup.string().oneOf(['frontend', 'backend', 'devops']).required(),
});

function Index() {
  return (
    <Box sx={{ my: 8, mx: 36 }}>
      <Typography sx={{ mb: 2 }} variant="h3">
        Brunos Forms
      </Typography>
      {/* Forms */}
      <Formik
        initialValues={initialValues}
        validationSchema={FORM_VALIDATION}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values, errors, isSubmitting, isValidating }) => (
          <Form>
            <Grid container spacing={2}>
              {/* TextField */}
              <Grid item xs={12}>
                <Field
                  name="fullName"
                  as={TextField}
                  fullWidth
                  label="Name"
                  helperText={<ErrorMessage name="fullName" />}
                />
              </Grid>
              {/* Date */}
              <Grid item xs={12}>
                <Field
                  type="date"
                  name="date"
                  as={TextField}
                  fullWidth
                  label="Date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  helperText={<ErrorMessage name="date" />}
                />
              </Grid>
              {/* Select - Dependents */}
              <Grid item xs={12}>
                <Field
                  select
                  name="dependents"
                  as={TextField}
                  fullWidth
                  label="Select - dependents"
                  helperText={<ErrorMessage name="dependents" />}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                </Field>
              </Grid>

              {/* Checkbox */}
              <Grid item xs="auto">
                <MyCheckbox name="investmentRisk" value="High" label="High" />
              </Grid>
              <Grid item xs="auto">
                <MyCheckbox
                  name="investmentRisk"
                  value="Medium"
                  label="medium"
                />
              </Grid>
              <Grid item xs="auto">
                <MyCheckbox name="investmentRisk" value="Low" label="Low" />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ fontSize: 12, color: 'red', mt: '-18px', ml: '14px' }}
                >
                  <ErrorMessage name="investmentRisk" />
                </Typography>
              </Grid>

              {/* Radio */}
              <Grid item xs={12}>
                <FormLabel component="legend">Gender</FormLabel>
                <MyRadio name="radio" label="Frontend" value="frontend" />
                <MyRadio name="radio" label="Backend" value="backend" />
                <MyRadio name="radio" label="DevOps" value="devops" />
              </Grid>
              {/* Terms and Condition */}
              <Grid item xs={12}>
                <MyCheckbox
                  name="acceptedTermsAndConditions"
                  label="Accept terms and conditions"
                />
                <Typography sx={{ fontSize: 12, color: 'red' }}>
                  <ErrorMessage name="acceptedTermsAndConditions" />
                </Typography>
              </Grid>
              {/* Submit Button */}
              <Grid sx={{ mb: 12 }} item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting || isValidating}
                >
                  Submit Form
                </Button>
              </Grid>
              {/* Values */}
              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default Index;
