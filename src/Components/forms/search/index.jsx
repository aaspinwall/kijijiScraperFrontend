import React, { useEffect } from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";
import styled from "styled-components";

export const Wrapper = styled.form`
  form {
    font-family: Mulish;
    display: grid;
    padding: 2rem 15%;
  }

  > * {
    margin: 0.5rem 0 0;
    padding: 0.5rem;
    > * {
      border-radius: 6px;
    }
  }
  select {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const Input = styled(Field)`
  padding: 0.5rem;
  margin-bottom: 1rem;
`;
const Label = styled.label`
  margin: 0.5rem 0;
`;
const Error = styled(ErrorMessage)`
  font-size: 0.7rem;
  color: red;
`;
const Button = styled.button`
  padding: 0.5rem;
  border-radius: 15px;
  margin: 0.15rem 0;
  font-weight: bold;
  background: #ff715b;

  :disabled {
    background: papayawhip;
  }
`;

const placeholders = {
  keywords: "Pick your neighbourhood",
  minPrice: 1000,
  maxPrice: 1500,
  maxResults: 40,
};
const initialValues = {
  keywords: "",
  minPrice: 1000,
  maxPrice: 1500,
  maxResults: 40,
};

const validate = async (values) => {
  const errors = {};
  if (!values.keywords) errors.keywords = "This field is required";
  if (values.minPrice <= 0) errors.minPrice = "Invalid value";
  if (values.maxPrice <= 0) errors.maxPrice = "Invalid value";
  if (values.maxResults <= 0) errors.maxResults = "Invalid value";
  if (values.minPrice >= values.maxPrice)
    errors.maxPrice = "Min price should be lower than max";
  return errors;
};

const MyForm = () => {
  useEffect(() => {
    const inputs = document.getElementsByTagName("input");
    Object.values(inputs).forEach((v) => {
      v.autocomplete = "off";
      v.ariaAutoComplete = "off";
    });
  }, []);
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 2000);
          }
        }}
        handleReset={() => console.log("reset")}
      >
        {({ isSubmitting, handleReset, isValid, isValidating }) => (
          <Form>
            <Label htmlFor='keywords'>Keywords</Label>
            <Input
              type='text'
              name='keywords'
              placeholder={placeholders.keywords}
            ></Input>
            <Error name='keywords' component='span' />

            <Label htmlFor='minPrice'>Min price</Label>
            <Input
              type='number'
              name='minPrice'
              placeholder={placeholders.minPrice}
            />
            <Error name='minPrice' component='span' />

            <Label htmlFor='maxPrice'>Max price</Label>
            <Input
              type='number'
              name='maxPrice'
              placeholder={placeholders.maxPrice}
            />
            <Error name='maxPrice' component='span' />

            <Label htmlFor='maxResults'>Max results</Label>
            <Input
              type='number'
              name='maxResults'
              placeholder={placeholders.maxResults}
            />
            <Error name='maxResults' component='span' />

            <Button type='reset' onClick={handleReset}>
              Reset
            </Button>
            <Button type='submit' disabled={isValid && isSubmitting}>
              Search
            </Button>
            <div>{isValidating ? "...Validating" : null}</div>
            <div>{isSubmitting ? "...Submitting" : null}</div>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default MyForm;
