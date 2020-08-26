import React from "react";
import { Form, Formik, Field } from "formik";
import { preventAutoFill } from "../../../../Utilities/preventAutoFill";

const Search = ({ initial, submit, toGlobal }) => {
  React.useEffect(preventAutoFill, []);
  return (
    <Formik
      initialValues={initial}
      onSubmit={(values, actions) => {
        submit(JSON.stringify(values));
      }}
    >
      {({ handleSubmit, values }) => (
        <Form onSubmit={handleSubmit} onBlur={() => toGlobal(values)}>
          <Field type='keywords' name='keywords' placeholder='Keywords' />
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Search;
