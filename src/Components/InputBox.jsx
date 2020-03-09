import React, { useState } from "react";

export default function InputBox(props) {
  const [value, setValue] = useState(props.value);
  const [initialValue] = useState(props.value);
  const submit = props.submit
    ? props.submit
    : e =>
        console.log(
          "Pressed enter but did not assign a submit function on component: ",
          e.target
        );
  const handleInput = e => {
    setValue(e.target.value);
  };
  const isIn = e => {
    if (e.target.value.toString() === initialValue.toString()) {
      setValue("");
    }
  };
  const isOut = e => {
    if (e.key) {
      //TAB out with no value
      if (e.key === "Tab") {
        if (toString(e.target.value) === "") {
          props.writeToState(initialValue);
        } else {
          props.writeToState(e);
        }
      }
      if (e.key === "Enter") {
        submit(e);
      }
    }
  };

  const checkInputType = input => {
    //Check the type of value
    let isArray = input instanceof Array && input.constructor === Array;
    if (isArray) {
      console.log("That is an array, fix input component");
      setValue(input.join("+"));
    }
    return input;
  };

  const checkOutputType = output => {
    let isArray = output instanceof Array && output.constructor === Array;
    return output;
  };

  checkInputType(value);

  return (
    <input
      id={props.id}
      type={props.type}
      value={value}
      placeholder={initialValue}
      onChange={handleInput}
      onFocus={isIn}
      //Once focus is off
      onBlur={e => {
        isOut(e);
      }}
      onKeyDown={e => isOut(e)}
    ></input>
  );
}
