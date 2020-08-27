import React from "react";
import { Form, Formik, Field } from "formik";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  FormControl,
} from "@chakra-ui/core";
import { preventAutoFill } from "../../../../Utilities/preventAutoFill";

const Search = ({ initial, submit, toGlobal }) => {
  React.useEffect(preventAutoFill, []);
  return (
    <Formik
      initialValues={initial}
      onSubmit={(values) => {
        submit(JSON.stringify(values));
      }}
    >
      {({ handleSubmit, values }) => (
        <Form onSubmit={handleSubmit} onBlur={() => toGlobal(values)}>
          <Field type='keywords' name='keywords' placeholder='Keywords'>
            {({ field, form }) => (
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    children={
                      <button type='submit'>
                        <Icon name='search' />
                      </button>
                    }
                  />
                  <Input borderRadius='40px' {...field}></Input>
                </InputGroup>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default Search;
