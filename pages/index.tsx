import React from 'react';
import { Box, Grid, Typography, TextField, MenuItem } from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import { string } from 'yup';
import Atuta from '../Components/FormsUI/Bruno';
import MyCheckbox from '../Components/FormsUI/MyCheckbox';

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
}

const initialValues: InvestmentDetails = {
  fullName: '',
  initialInvestment: 0,
  investmentRisk: [],
  commentAboutInvestmentRisk: '',
  dependents: -1,
  acceptedTermsAndConditions: false,
  date: '',
};

function Index() {
  return (
    <Box sx={{ my: 8, mx: 36 }}>
      <Typography sx={{ mb: 2 }} variant="h3">
        Brunos Forms
      </Typography>
      {/* Forms */}
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values, errors, isSubmitting, isValidating }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field name="fullName" as={TextField} fullWidth label="Name" />
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
                />
              </Grid>
              {/* Select */}
              <Grid item xs={12}>
                <Field
                  select
                  name="dependents"
                  as={TextField}
                  fullWidth
                  label="Select"
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
                <MyCheckbox
                  name="acceptedTermsAndConditions"
                  label="Accept terms and conditions"
                />
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
