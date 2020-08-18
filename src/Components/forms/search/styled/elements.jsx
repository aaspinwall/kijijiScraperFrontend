import { Field, ErrorMessage } from "formik";
import styled from "styled-components";

export const Wrapper = styled.form`
  form {
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

export const Input = styled(Field)`
  padding: 0.5rem;
`;
export const Label = styled.label`
  font-size: 1rem;
  text-align: left;
  margin: 0.5rem 0;
`;
export const Error = styled(ErrorMessage)`
  font-size: 0.7rem;
  color: red;
  min-height: 0.7rem;
`;
export const Button = styled.button`
  padding: 0.5rem;
  border-radius: 15px;
  margin: 0.15rem 0;
  font-weight: bold;
  background: #ff715b;

  :disabled {
    background: papayawhip;
  }
`;
