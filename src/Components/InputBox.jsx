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
    } else {
      props.writeToState(e);
    }
  };

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
