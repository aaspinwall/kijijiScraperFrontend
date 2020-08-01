import React, { useState } from "react";
import { Input } from "../Styles/Components";

export default function InputBox({
  config: { id, type, value: inputValue },
  submit,
  writeToState,
  className,
}) {
  const [value, setValue] = useState(inputValue);
  const [initialValue] = useState(inputValue);

  const handleInput = (e) => {
    if (e.key === "Enter") {
      submit(e);
    }
    setValue(e.target.value);
  };
  const isIn = (e) => {
    if (e.target.value.toString() === initialValue.toString()) {
      setValue("");
    }
  };
  const isOut = (e) => {
    writeToState(e);
    if (e.key) {
      //TAB out with no value
      if (e.key === "Tab") {
        if (toString(e.target.value) === "") {
          writeToState(initialValue);
        }
      }
      if (e.key === "Enter") {
        submit(e);
      }
    }
  };

  return (
    <Input
      className={className}
      id={id}
      type={type}
      value={value}
      placeholder={initialValue}
      onChange={handleInput}
      onFocus={isIn}
      //Once focus is off
      onBlur={(e) => {
        isOut(e);
      }}
      onKeyDown={(e) => isOut(e)}
    ></Input>
  );
}
