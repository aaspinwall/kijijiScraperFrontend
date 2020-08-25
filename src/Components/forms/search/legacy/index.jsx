import React from "react";
import { preventAutoFill } from "../../../../Utilities/preventAutoFill/index";
import Button from "../../../../Components/button";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Formik, Field } from "formik";
import { Container, Section, Box } from "./elements";

const Search = ({ query, close }) => {
  const { keywords, minPrice, maxPrice, maxResults } = query;
  React.useEffect(() => {
    const catchEsc = (e) => {
      if (e.key === "Escape") close();
    };
    preventAutoFill();
    document.querySelector("#keywords").focus();
    window.addEventListener("keydown", catchEsc);
    return () => {
      window.removeEventListener("keydown", catchEsc);
    };
  }, []);

  const initialValues = {
    keywords: keywords ? keywords : "",
    minPrice: minPrice ? minPrice : 1000,
    maxPrice: maxPrice ? maxPrice : 1500,
    maxResults: maxResults ? maxResults : 20,
  };
  const placeholders = {
    keywords: "Pick your neighbourhood",
    minPrice: 1000,
    maxPrice: 1500,
    maxResults: 20,
  };

  const validate = async (values) => {
    const errors = {};
    if (!values.keywords) errors.keywords = "Add a keyword";
    if (values.minPrice <= 0) errors.minPrice = "Invalid value";
    if (values.maxPrice <= 0) errors.maxPrice = "Invalid value";
    if (values.maxResults <= 0) errors.maxResults = "Invalid value";
    if (values.minPrice >= values.maxPrice)
      errors.maxPrice = "Min price should be lower than max price";
    return errors;
  };
  return (
    <Container>
      <Section>
        <Formik
          initialValues={initialValues}
          validateOnMount={true}
          validate={validate}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({ handleSubmit, isSubmitting, isValid, errors }) => (
            <form onSubmit={handleSubmit}>
              <Field name='keywords'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.keywords && form.touched.keywords}
                  >
                    <FormLabel htmlFor='keywords'>Keywords</FormLabel>
                    <Input
                      {...field}
                      id='keywords'
                      placeholder={placeholders.keywords}
                    />
                    <FormErrorMessage>{errors.keywords}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='minPrice'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.minPrice && form.touched.minPrice}
                  >
                    <FormLabel htmlFor='minPrice'>Min Price</FormLabel>
                    <Input
                      {...field}
                      type='number'
                      id='minPrice'
                      placeholder={placeholders.minPrice}
                    />
                    <FormErrorMessage>{errors.minPrice}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='maxPrice'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.maxPrice && form.touched.maxPrice}
                  >
                    <FormLabel htmlFor='maxPrice'>Max Price</FormLabel>
                    <Input
                      {...field}
                      type='number'
                      id='maxPrice'
                      placeholder={placeholders.maxPrice}
                    />
                    <FormErrorMessage>{errors.maxPrice}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='maxResults'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.maxResults && form.touched.maxResults
                    }
                  >
                    <FormLabel htmlFor='maxResults'>Results</FormLabel>
                    <Input
                      {...field}
                      type='number'
                      id='maxResults'
                      placeholder={placeholders.maxResults}
                    />
                    <FormErrorMessage>{errors.maxResults}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                text={"Search"}
                isLoading={isSubmitting}
                isDisabled={!isValid}
              />
            </form>
          )}
        </Formik>
      </Section>
    </Container>
  );
};

export default Search;
